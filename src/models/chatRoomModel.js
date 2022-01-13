const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    userID: { type: String, required: false },
    username: { type: String, required: false },
    message: { type: String, required: false },
    timeStamp: { type: String, required: false, default: null },

    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
    client_id: { type: Number, required: true, default: 1 },

});

const chatRoom = new mongoose.model("ChatRoom", chatRoomSchema);

module.exports = chatRoom;
