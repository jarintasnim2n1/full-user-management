import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
         type: String,
        required:true,
        trim:true,
        lowercase:true
    },
    phone:{
         type: String,
        required:true,
        
    },
    status:{
         type: String,
      default:"Active",
       enum:["Active", "Inactive"]
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
},
{timestamps: true});

export default mongoose.model("User", userSchema);