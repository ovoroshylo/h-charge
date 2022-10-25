import HttpStatus from 'http-status-codes'
import dbConnect from '../../../lib/dbConnect'
import SettingModel from "../../../models/Setting"


export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getTwitterFollower(req, res);
        }
        
    }
    
}

const getTwitterFollower = async(req,res)=>{
    await dbConnect()
    let cnt = await SettingModel.findOne({label: "twitter"});
    if(cnt)
    {
        cnt = cnt.value;
    }
    else
    {
        const newSetting = new SettingModel({label: "twitter", value: "0"})
        await newSetting.save()

        cnt = 0;
    }
    res.send(cnt);
}