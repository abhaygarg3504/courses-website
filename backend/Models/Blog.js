import mongoose from 'mongoose';

const blogSchema  = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    tags:{
        type: Array,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    blog:{
        type:String,
        required:true
    }
    ,
    postAt:{
        type:Date,
        default:Date.now
    }
})

const Blog = mongoose.model("blogs",blogSchema);

export default Blog;