import mongoose from 'mongoose';
import plm from 'passport-local-mongoose'
// adding user by schema
const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    number: String,
    country : String,
    role: { type: String, enum: ['admin', 'user', 'employee'], required: true },
    
    // user fields
    
    isVerified : {
        type : Boolean,
        default : false
    },
    googleId : String,

    // employee specific fields

    authority : String,
});


userSchema.plugin(plm,{ usernameField : 'email' });


const User = mongoose.model('users', userSchema);

export default User;