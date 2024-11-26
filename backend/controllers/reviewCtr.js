const asyncHandler = require("express-async-handler");
const Comment=require('../models/commenModel')






const  CreateComment = asyncHandler(async(req,res)=>{

    const userId =req.user._id;  
    const {productId,comment}=req.body;

    const Newcomment= new Comment({
        productId,
        userId,
        comment,
    });

    await Newcomment.save();

    res.status(201).json(Newcomment);

});


const  getComments = asyncHandler(async(req,res)=>{

    const { productId } = req.params;
    const AllComments= await Comment.find({productId}).sort({createdAt: -1}).populate('userId', 'name')

    res.status(200).json(AllComments);
  
});







module.exports= {
    CreateComment,
    getComments
}