import mongoose from "mongoose";
const callSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    scheduledAt: {
      type: String,
    },
    shift: {
      type: String,
    },
    country : String,
    number:String,
    foreignCountry:String,
    cartId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "carts"
    },
    reason:{
      type:String,
      default:"Hire coucellor"
    },
    folder:{
      type:String,
    }
  },
  { timestamps: true }
);

const Call = mongoose.model("Call", callSchema);

export default Call;
