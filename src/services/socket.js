import socketIOClient from "socket.io-client";

// const serverEndpoint = "<your-nodejs-server-url>";
// const serverEndpoint = "http://localhost:8080";
const serverEndpoint = "https://mychat-api.herokuapp.com";

export const socket = socketIOClient(serverEndpoint, {
    transports: ['websocket']
});