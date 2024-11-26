const express=require('express')
const http = require('http');
const { Server } = require('socket.io');
const Notification =require('./models/NotificModel')
const Comment = require('./models/commenModel');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3003"],
    credentials: true,
  },
});



io.on("connection", (socket)=>{

    console.log("A user connected", socket.id);

    socket.on("join-product", (productId) => {

        socket.join(productId);
        console.log(`User joined product room: ${productId}`);
    });


     socket.on("new-comment",async(data)=>{
       const {productId}=data; // this data conatins productId and also cooment that we sends.
       if (!productId) return;

       io.to(productId).emit("recieve-comment",data) //here send the comment to all users in the product room  

       const totalComments=await Comment.countDocuments({ productId });
       io.to(productId).emit("review-counts", {productId,totalComments}); //updtaes coment count after new comments send
       
    });

      
    //review counts
    socket.on('gets-count',async(productId)=>{
      if (!productId) return;
      
        const totalComments=await Comment.countDocuments({ productId });
           io.to(productId).emit("review-counts", {productId,totalComments});
      
    });

     //creates notification and sends
    socket.on('creates-notific',async(data)=>{
        const {userId,name,message}=data;

        const createNotification=await Notification.create({
          userId,
          name,
          message
        });

        await createNotification.save();

        const notification=await Notification.find({ isRead: false}).select('-userId');
        
        
        io.emit('send-to-all', notification)
        
    });

    //disconnect socket

    socket.on("disconnect",()=>{
       console.log("A user disconnects",socket.id);
       
    });

});




module.exports = { server,app };