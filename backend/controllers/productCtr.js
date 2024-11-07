const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify= require('slugify')
const cloudinary = require("cloudinary").v2;
const fs=require('fs')




const createProduct = asyncHandler(async(req,res)=>{

    const { title, description, price, category, height, lengthpic, width, mediumused, weight } = req.body;
    const userId = req.user.id;
    
    const originalSlug = slugify(title,{
        lower:true,
        remove: /[*+~.()'"!:@]/,
        strict: true,

    })

    let slug = originalSlug;
    let suffix = 1;
  
    while (await Product.findOne({ slug })) {
      slug = `${originalSlug}-${suffix}`;
      suffix++;
    }


    if (!title || !description || !price) {
        res.status(400);
        throw new Error("Please fill in all fields");
      }

         
      let fileData = {};
      if (req.file) {
        let uploadedFile;
        try {
          uploadedFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "Bidding/Product",
            resource_type: "image",
          });

          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error("Failed to delete local file:", err);
            }
          });

        } catch (error) {
          res.status(500);
          throw new Error("Image could not be uploaded");
        }
    
        fileData = {
          fileName: req.file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: req.file.mimetype,
          public_id: uploadedFile.public_id,
        };
      }

      


      const product = await Product.create({
        user: userId,
        title,
        slug: slug,
        description,
        price,
        category,
        height,
        lengthpic,
        width,
        mediumused,
        weight,
        image: fileData, 
      });
    
      res.status(201).json({
        success: true,
        data: product,
      });
    

});



module.exports ={
    createProduct,
}