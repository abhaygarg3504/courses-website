import { json } from "express";
import Job from "../Models/Job.js";

async function addJob(req,res){
    let {name,tags,salary,link} = req.body;
    try {
        const job = await Job.create({
            name,tags,salary,link
        })
        res.json({message:"success",job:job});
    } catch (error) {
        res.status(400).send(json({message : "error",error: error}));
    }
}

async function jobData(req,res){
    try {
        const job = await Job.find({});
        res.json({message:"success",job:job});
    } catch (error) {
        res.status(400).send(json({message : "error",error: error}));
    }
}

async function jobEdit(req,res){
    const {_id,name,tags,salary,link} = req.body;
    const job  = await Job.findOne({_id:_id});
    if(job){
        try {
            const updatedJob = await Job.updateOne({_id:_id},{$set:{name,tags,salary,link}},{upsert : false});
            res.status(200).json({message:"object updated successfully",updatedJob:updatedJob});
        } catch (error) {
            res.status(400).json({message:"Unknown error occurred.",error:error});
        }
    }
    else{
        res.status(404).json({message:"Object not found"});
    }
}

async function jobDelete(req,res){
    const { _id } = req.body;
  try {
    const deletedObject = await Job.findByIdAndDelete(_id);
    if(deletedObject){
        res.status(200).json({ message: "Object updated successfully", deletedObject });
    }
  } catch (error) {
    console.error("Error creating or updating object:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const jobRoutes = {addJob,jobData,jobEdit,jobDelete};
export default jobRoutes;