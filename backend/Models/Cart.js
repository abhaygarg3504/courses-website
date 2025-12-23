import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user :{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    courses :[{type: mongoose.Schema.Types.ObjectId, ref: 'courses'}],
});

const cartItem = mongoose.model("cart" , cartSchema);

export default cartItem;