const express = require("express");
const router = express.Router();
const {createProduct}=require('../controllers/productCtr')
const { protect}=require('../middleware/auth')
const { upload } =require('../utils/fileUpload')


router.post("/",protect,upload.single('image'),createProduct);







module.exports = router;