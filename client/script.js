var socket = io();
let username = "";


const joinChatButton = document.getElementById("join-chat");
const userNameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatRoomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainer = document.querySelector(".messages-container");

joinChatButton.addEventListener("click", (event) => {
  event.preventDefault(); 
  event.stopPropagation(); 
  username = userNameInput.value;
  console.log(username);
  if (username) {
    form.style.display = "none";
    chatRoomContainer.style.display = "block";
  }
});

function renderMessage(dataObj,typeOfMsg){
  const msgDiv = document.createElement("div");
  msgDiv.innerText = `${dataObj.username}:${dataObj.message}`
  if(typeOfMsg === 'SENT'){
    msgDiv.setAttribute('class','message sent');
  }else{
    msgDiv.setAttribute('class','message')
  }
  messageContainer.append(msgDiv);
  messageInput.value = "";
}

sendButton.addEventListener("click",(event)=>{
    event.preventDefault();
    event.stopPropagation();
    let data = {
        id:socket.id,
        message:messageInput.value,
        username:username
    }
    socket.emit("this is a msg event",data);
    renderMessage(data,'SENT');
})

socket.on(("this is a msg event"),(data)=>{
  if(socket.id !== data.id){
    renderMessage(data, "RECIEVE");
  }
});

