import mongoose from "mongoose";

export const connection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "JOB_PORTAL"
  }).then(()=>{
    console.log("Connection Succsesfull")
  }).catch(erro=>{
    console.log(`Some Error : ${erro}`);
  })
};
