const express = require("express");
const { protect,isSeller }=require('../middleware/auth')
const {getBiddingHistory,sellProduct,placeBid}=require('../controllers/biddingCtr')
const { CreateComment ,getComments,AllNotification}=require('../controllers/reviewCtr')
const router = express.Router();




router.get("/:productId", getBiddingHistory);
router.get('/:productId/comments',getComments)
router.post("/sell", protect, isSeller, sellProduct);
router.get('/notification',protect,AllNotification)
router.post("/", protect, placeBid);
router.post('/create-commment',protect,CreateComment)



module.exports = router; 