import socketIOClient from "socket.io-client";

// const serverEndpoint = "<your-nodejs-server-url>";
const serverEndpoint = "http://localhost:8080";

export const socket = socketIOClient(serverEndpoint, {
    transports: ['websocket']
});