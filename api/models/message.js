const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    name: {
        type: String,
        require: true
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
    ipaddress: {
        type: String,
        require: true
    },
    useragent: {
        type: String,
        require: false
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;