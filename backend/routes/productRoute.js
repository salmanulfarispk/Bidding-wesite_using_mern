const express = require("express");
const router = express.Router();
const {createProduct,deleteProduct,getAllproducts,updateProduct,getWonProducts,deleteProductsByAmdin,getAllSoldProducts,getAllProductsByAmdin,getProductBySlug,getAllProductsofloginedUser,verifyAndAddCommissionProductByAmdin}=require('../controllers/productCtr')
const { protect,isSeller,isAdmin}=require('../middleware/auth')
const { upload } =require('../utils/fileUpload')




router.post("/",protect,isSeller,upload.single('image'),createProduct);   //only can creates admin or seller
router.delete("/:id", protect, isSeller, deleteProduct);
router.put("/:id", protect, isSeller, upload.single("image"),updateProduct);
router.get("/user", protect, getAllProductsofloginedUser);


router.get('/',getAllproducts)
router.get("/:id", getProductBySlug);
router.get("/sold", getAllSoldProducts);
router.get("/won-products", protect, getWonProducts);



//admin
router.patch("/admin/product-verified/:id", protect, isAdmin, verifyAndAddCommissionProductByAmdin);
router.get("/admin/products", protect, isAdmin, getAllProductsByAmdin);
router.delete("/admin/products", protect, isAdmin, deleteProductsByAmdin);




module.exports = router;