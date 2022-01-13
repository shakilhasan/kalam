const Model = require('../models');
const ConnectedClient = Model.connectedClientModel;

const findAll = async () => {
    const connectedClients = await ConnectedClient.find();
    return connectedClients;
}
const findByPagination = async (req, res) => {
    const _pageNumber = parseInt(req.params.page)
    const _pageSize = parseInt(req.params.pageSize)
    const client_id=1
    console.log(_pageSize)

    ConnectedClient.countDocuments({ client_id: client_id },function(err,count){
        ConnectedClient.find({client_id:client_id}, null,
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
const existByUserId = async (userId) => {
    const connectedClient = await ConnectedClient.findOne({userId:userId});
    if(connectedClient){
        return connectedClient
    }
    else {
        return false
    }
}
const findById = async (req, res) => {
    const connectedClient = await ConnectedClient.findById(req.params.id);
    res.send(connectedClient);
}

const store = async (data) => {
    const connectedClient = new ConnectedClient(data);
    connectedClient.createdAt = Date.now().toString();
    await connectedClient.save();
    return connectedClient;
}

const update = async (req, res) => {
    const id = req.params.id;
    let connectedClient = await ConnectedClient.findById(id);
    if (connectedClient) {
        await ConnectedClient.updateOne({_id:req.params.id},{...req.body, updatedAt: Date.now().toString()})
        connectedClient.save();
        res.send(connectedClient);
    }

    //    throw new NotFound("ConnectedClient not found by the id: " + id);
}

const destroyAll = async () => {
    try {
        await ConnectedClient.deleteMany({});
    }catch (e){
        throw new NotFound("ConnectedClient not found ",e );
    }
}
const destroy = async (req, res) => {
    let connectedClient = await ConnectedClient.findById(req.params.id);
    if (connectedClient) {
        let result = await ConnectedClient.deleteOne({ _id: req.params.id });
        res.send(connectedClient);
    }

    throw new NotFound("ConnectedClient not found by the id: " + req.params.id);
}
const destroyByUserId = async (userId) => {
    let connectedClient = await ConnectedClient.findOne({userId:userId});
    if (connectedClient) {
        let result = await ConnectedClient.deleteMany({ userId: userId });
        return connectedClient;
    }

    throw new NotFound("ConnectedClient not found by the id: " + userId);
}

module.exports = { findAll, findByPagination, findById, existByUserId, store, update, destroyAll, destroy, destroyByUserId };
