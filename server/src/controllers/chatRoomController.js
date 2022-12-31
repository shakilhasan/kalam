const Model = require('../models');
const ChatRoom = Model.chatRoomModel;

const findAll = async () => {
    const chatRooms = await ChatRoom.find();
    return chatRooms;
}
const findByPagination = async (req, res) => {
    const _pageNumber = parseInt(req.params.page)
    const _pageSize = parseInt(req.params.pageSize)
    const client_id=1
    console.log(_pageSize)

    ChatRoom.countDocuments({ client_id: client_id },function(err,count){
        ChatRoom.find({client_id:client_id}, null,
            {sort: {createdAt: -1}}
        )
            .skip(_pageNumber > 0 ? ((_pageNumber - 1) * _pageSize) : 0)
            .limit(_pageSize)
            .exec(function(err, docs) {
                if (err)
                    res.json(err);
                else
                    res.json({
                        "Total": count,
                        "_Data": docs
                    });
            });
    });
}
const findById = async (req, res) => {
    const chatRoom = await ChatRoom.findById(req.params.id);
    res.send(chatRoom);
}

const store = async (data) => {
    const chatRoom = new ChatRoom(data);
    chatRoom.createdAt = Date.now().toString();
    await chatRoom.save();
    return chatRoom;
}

const update = async (req, res) => {
    const id = req.params.id;
    let chatRoom = await ChatRoom.findById(id);
    if (chatRoom) {
        await ChatRoom.updateOne({_id:req.params.id},{...req.body, updatedAt: Date.now().toString()})
        chatRoom.save();
        res.send(chatRoom);
    }

    //    throw new NotFound("ChatRoom not found by the id: " + id);
}

const destroyAll = async () => {
    try {
        await ChatRoom.deleteMany({});
    }catch (e){
        throw new NotFound("ChatRoom not found ",e );
    }
}
const destroy = async (req, res) => {
    let chatRoom = await ChatRoom.findById(req.params.id);
    if (chatRoom) {
        let result = await ChatRoom.deleteOne({ _id: req.params.id });
        res.send(chatRoom);
    }

    throw new NotFound("ChatRoom not found by the id: " + req.params.id);
}

module.exports = { findAll, findByPagination, findById, store, update, destroyAll, destroy };
