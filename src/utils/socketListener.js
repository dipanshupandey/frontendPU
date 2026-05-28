import socket from "../socket";

const socketListener=()=>{
socket.on("message:new",(message)=>{
    console.log("New message received:", message);
    // You can add code here to update your UI or state with the new message
});
};
export default socketListener;