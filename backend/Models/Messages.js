import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    email: String,
    name: String,
    subject: String,
    message: String,
    number: String,
    country: String,
    date: {
        type: Date,
        default: Date.now
    },
})

const Message = mongoose.model("messages", MessageSchema);
export default Message;