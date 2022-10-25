import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const Setting = new Schema({
  label:{
    type:String,
    required:true
  },
  value:{
    type:String,
    required:true
  }
})

module.exports = mongoose.models.Setting || mongoose.model("Setting", Setting);
