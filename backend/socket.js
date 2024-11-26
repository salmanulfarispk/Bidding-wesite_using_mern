const express=require('express')
const http = require('http');
const { Server } = require('socket.io');
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
        console.log(productId);
        console.log(`User joined product room: ${productId}`);
    });


     socket.on("new-comment",(data)=>{
       const {productId}=data; // this data conatins productId and also cooment thgat we sends.

       //here send the comment to all users in the product room
       io.to(productId).emit("recieve-comment",data) 

    });



    //disconnect socket

    socket.on("disconnect",()=>{
       console.log("A user disconnects",socket.id);
       
    });

});




module.exports = { server,app };