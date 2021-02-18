const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    ipAddress: {
        type: String,
        require: true
    },
    infoBrowser: {
        type: String,
        require: false
    }
});

const Message = model('Message', messageSchema);
module.exports = Message;