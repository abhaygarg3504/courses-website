import mongoose from 'mongoose'

const JobSchema = mongoose.Schema({
    name: String,
    tags: String,
    salary: String,
    link : String,
})

const Job = mongoose.model("jobs",JobSchema);

export default Job;