const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const BiddingProduct = require("../models/biddingProduct");
const User=require('../models/userModel')
const sendEmail=require('../utils/sendEmail')


const getBiddingHistory = asyncHandler(async(req,res)=>{

    const { productId } = req.params;

    const biddingHistory = await BiddingProduct.find({ product: productId }).sort("-createdAt").populate("user").populate("product");
  
    res.status(200).json(biddingHistory);

});





const sellProduct=asyncHandler(async(req,res)=>{

    const { productId } = req.body;
    const userId = req.user.id;    
  
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.user.toString() !== userId) {
        return res.status(403).json({ error: "You do not have permission to sell this product" });
      }

      const highestBid = await BiddingProduct.findOne({ product: productId }).sort({ price: -1 }).populate("user"); // it takes prices from largest to smaller
      if (!highestBid) {
        return res.status(400).json({ error: "No winning bid found for the product" });
      }

        // Calculate commission and final price
      const commissionRate = product.commission;
      const commissionAmount = (commissionRate / 100) * highestBid.price;
      const finalPrice = highestBid.price - commissionAmount;
    

      // Update product details
      product.isSoldout = true;
      product.soldTo = highestBid.user;
      product.soldPrice = finalPrice;


      const admin = await User.findOne({ role: "admin" });
      if (admin) {
        admin.commissionBalance += commissionAmount;
        await admin.save();
      }

      //updates seller users balance
      const sellerUser = await User.findById(product.user);
      if (sellerUser) {
        sellerUser.balance += finalPrice; 
        await sellerUser.save();
      } else {
        return res.status(404).json({ error: "Seller not found" });
      }
    

      await product.save();


       // Send email notification to the highest bidder
      await sendEmail({
      email: highestBid.user.email,
      subject: "Congratulations! You won the auction!",
      text: `You have won the auction for "${product.title}" with a bid of $${highestBid.price}.`,
      });

      res.status(200).json({ message: "Product has been successfully sold!" });


});



const placeBid=asyncHandler(async(req,res)=>{

    const { productId, price } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product.isverify) {
    res.status(400);
    throw new Error("Bidding is not verified for these products.");
  }

  if (!product || product.isSoldout === true) {
    res.status(400);
    throw new Error("Invalid product or bidding is closed");
  }

  const existingUserBid = await BiddingProduct.findOne({ user: userId, product: productId });

  if (existingUserBid) {
    if (price <= existingUserBid.price) {
      res.status(400);
      throw new Error("Your bid must be higher than your previous bid");
    }
    existingUserBid.price = price;

    await existingUserBid.save();

     return res.status(200).json({ biddingProduct: existingUserBid });

  } else {

    const highestBid = await BiddingProduct.findOne({ product: productId }).sort({ price: -1 }); //larger price to lower

    if (highestBid && price <= highestBid.price) {
      res.status(400);
      throw new Error("Your bid must be higher than the current highest bid");
    }

    const biddingProduct = await BiddingProduct.create({
      user: userId,
      product: productId,
      price,
    });

    res.status(201).json(biddingProduct);
  }

});



module.exports={
 
    getBiddingHistory,
    sellProduct,
    placeBid

}