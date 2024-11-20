const express = require("express");
const { protect,isSeller }=require('../middleware/auth')
const {getBiddingHistory,sellProduct,placeBid}=require('../controllers/biddingCtr')
const router = express.Router();




router.get("/:productId", getBiddingHistory);
router.post("/sell", protect, isSeller, sellProduct);
router.post("/", protect, placeBid);


module.exports = router; 