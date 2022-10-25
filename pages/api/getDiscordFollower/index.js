import HttpStatus from 'http-status-codes'
import dbConnect from '../../../lib/dbConnect'
import SettingModel from "../../../models/Setting"


export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getDiscordFollower(req, res);
        }
    }
}

const getDiscordFollower = async(req,res)=>{
    await dbConnect()
    let cnt = await SettingModel.findOne({label: "discord"});
    if(cnt)
    {
        cnt = cnt.value;
    }
    else
    {
        const newSetting = new SettingModel({label: "discord", value: "0"})
        await newSetting.save()

        cnt = 0;
    }
    res.send(cnt);
}