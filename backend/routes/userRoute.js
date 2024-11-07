const express = require("express");
const router = express.Router();
const {registerUser,loginUser,loginStatus,logoutUser, loginAsSeller,getUser,getUserBalance}=require('../controllers/userctr')
const { protect }=require('../middleware/auth')


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedin", loginStatus);
router.get("/logout", logoutUser);
router.post("/sellerlogin", loginAsSeller);
router.get('/getUser',protect,getUser)
router.get('/sell-amount',protect,getUserBalance)










module.exports = router;