import mongoose from 'mongoose';
import plm from 'passport-local-mongoose'

const adminSchema = new mongoose.Schema({
    username : String,
    number: String,
    email : String,
    password : String,
    address : String
});

adminSchema.plugin(plm,{ usernameField : 'email' });
const Admin = mongoose.model('admins', adminSchema);

export default Admin;