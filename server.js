const express=require("express");
const app=express();
const http=require("http").createServer(app);
app.use(express.static(__dirname+"/public"))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

http.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port 3000")
});

//Socket
const io=require("socket.io")(http)
io.on("connection",function(socket){
    console.log("Connected...");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })

})