import HttpStatus from 'http-status-codes'
import dbConnect from '../../../../lib/dbConnect'
import SettingModel from "../../../../models/Setting"


export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'POST': {
            return setDiscordFollower(req, res);
        }
    }
}

const setDiscordFollower = async(req,res)=>{
    await dbConnect()
    await SettingModel.findOneAndUpdate({label: "discord"}, {value: req.body.count})
    res.status(HttpStatus.ACCEPTED).json({success:true})
}