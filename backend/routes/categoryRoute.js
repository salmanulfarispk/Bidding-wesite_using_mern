const express = require("express");
const categoryRoute = express.Router();
const { createCategory,getCategory,updateCategory,deleteCategory,getAllCategory}=require('../controllers/categoryCtr')
const {protect,isAdmin}=require('../middleware/auth')



categoryRoute.post("/", protect, isAdmin, createCategory);
categoryRoute.get("/", getAllCategory);
categoryRoute.get("/:id", protect, isAdmin, getCategory);
categoryRoute.put("/:id", protect, isAdmin, updateCategory);
categoryRoute.delete("/:id", protect, isAdmin, deleteCategory);





module.exports = categoryRoute;