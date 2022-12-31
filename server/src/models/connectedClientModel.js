const mongoose = require('mongoose');

const connectedClientSchema = new mongoose.Schema({
    userID: { type: String, required: false },
    username: { type: String, required: false },
    message: { type: String, required: false },
    timeStamp: { type: String, required: false, default: null },

    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
    client_id: { type: Number, required: true, default: 1 },

});

const connectedClient = new mongoose.model("ConnectedClient", connectedClientSchema);

module.exports = connectedClient;
