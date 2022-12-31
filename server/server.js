const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const uuid = require('uuid-random');
const connectWithDb = require("./mongo");
const controller = require('./src/controllers');
const chatRoomController = controller.chatRoomController;
const connectedClientController = controller.connectedClientController;



const { uniqueNamesGenerator, adjectives, colors, animals, names } = require('unique-names-generator');

// Running our server on port 3080
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Listening at http://%s:%s', 'localhost:', port);
  connectWithDb();
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//.........
const io = require('socket.io')(server);
// let chatRoomData = [];
const connectedClients = {};

io.on('connection', (client) => {

  console.log("New client connected");

  //Client Sent a message
  client.on("SendMessage", async (messageData) => {
    // chatRoomData.push(messageData)
    await chatRoomController.store(messageData)
    await sendUpdatedChatRoomData(client)
  })

  //Client entered The chat Room
  client.on("UserEnteredRoom", async (userData) => {
    console.log("userData..",userData)
    const enteredRoomMessage = {
      message: `${userData.username} has entered the chat`,
      username: "",
      userID: 0,
      timeStamp: null
    };
    // chatRoomData.push(enteredRoomMessage)
    await chatRoomController.store(enteredRoomMessage)
    await sendUpdatedChatRoomData(client)
    connectedClients[client.id] = userData
    // await connectedClientController.store(userData)
  })

  //Creating identity for new connected user
  client.on("CreateUserData", () => {
    let userID = uuid();
    let username = uniqueNamesGenerator({ dictionaries: [adjectives, names] });
    const userData = {userID: userID, username: username};
    client.emit("SetUserData", userData)
  })


  //Player Disconnecting from chat room...
  client.on('disconnecting', async (data) => {
    console.log("Client disconnecting...");
    const existingClient = await connectedClientController.existByUserId(client.id)

    if(connectedClients[client.id]){
    // if(existingClient){
      const leftRoomMessage = {
        message: `${connectedClients[client.id].username} has left the chat`,
        // message: `${existingClient.username} has left the chat`,
        username: "",
        userID: 0,
        timeStamp: null
      };
      // chatRoomData.push(leftRoomMessage)
      await chatRoomController.store(leftRoomMessage)
      await sendUpdatedChatRoomData(client)
      delete connectedClients[client.id]
      // await connectedClientController.destroyByUserId(client.id)
    }

  });

  //Clearing Chat room data from server
  client.on('ClearChat', async () => {
    // chatRoomData=[]
    await chatRoomController.destroyAll()
    // console.log(chatRoomData)
    await sendUpdatedChatRoomData(client)
  })

})

//Sending update chat room data to all connected clients
async function  sendUpdatedChatRoomData(client){
  const allChatRoomData= await chatRoomController.findAll()
  client.emit("RetrieveChatRoomData", allChatRoomData)
  client.broadcast.emit("RetrieveChatRoomData", allChatRoomData)
  // client.emit("RetrieveChatRoomData", chatRoomData)
  // client.broadcast.emit("RetrieveChatRoomData", chatRoomData)

}
