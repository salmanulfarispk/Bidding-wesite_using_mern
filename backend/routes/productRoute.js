const express = require("express");
const router = express.Router();
const {createProduct,deleteProduct,getAllproducts,updateProduct,getAllProductsofloginedUser}=require('../controllers/productCtr')
const { protect,isSeller}=require('../middleware/auth')
const { upload } =require('../utils/fileUpload')



router.post("/",protect,isSeller,upload.single('image'),createProduct);   //only can creates admin or seller
router.delete("/:id", protect, isSeller, deleteProduct);
router.put("/:id", protect, isSeller, upload.single("image"),updateProduct);


router.get('/',getAllproducts)
router.get("/user", protect, getAllProductsofloginedUser);

module.exports = router;