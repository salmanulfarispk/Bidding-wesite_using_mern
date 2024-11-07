const express = require("express");
const router = express.Router();
const {registerUser,loginUser,loginStatus,logoutUser, loginAsSeller,getUser,estimateIncome,getUserBalance,getAllUsers}=require('../controllers/userctr')
const { protect ,isAdmin}=require('../middleware/auth')


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedin", loginStatus);
router.get("/logout", logoutUser);
router.post("/sellerlogin", loginAsSeller);
router.get('/getUser',protect,getUser)
router.get('/sell-amount',protect,getUserBalance)

 
//admin

router.get('/allUsers',protect,isAdmin,getAllUsers)
router.get('/estimate-Income',protect,isAdmin,estimateIncome)

 


module.exports = router;