const socket=io();
let user;
let textarea=document.querySelector("#textarea");
let messageArea=document.querySelector(".message__area");
do {
    user=prompt("Please enter your name");
} while (!user);

textarea.addEventListener("keyup",function(event){
    if(event.key==="Enter"){
        sendMessage(event.target.value);
    }
});

function sendMessage(message){
    let msg={
        user:user,
        message:message.trim()
    }
    //Append
    appendMessage(msg,"outgoing");
    textarea.value="";
    scrollToBottom();

    //Send to server
    socket.emit("message",msg);
}

function appendMessage(msg,type){
    let mainDiv=document.createElement("div");
    let className=type;
    mainDiv.classList.add(className,"message");

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
}

//Reacive message
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}