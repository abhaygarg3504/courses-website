import mongoose from "mongoose";

const trafficSchema = new mongoose.Schema({
  traffic: {
    type: Number,
    default : 0
  },
});
const Traffic = mongoose.model("traffic", trafficSchema);
export default Traffic;