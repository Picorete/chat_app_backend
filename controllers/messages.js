const Message = require('../models/message');

const getChat = async (req, res) => {

    const myId = req.uid;
    const msgTo = req.params.to;

    const last30 = await Message.find({
        $or: [{ from: myId, to: msgTo }, {from: msgTo, to: myId }]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });
}

module.exports = {
    getChat
}