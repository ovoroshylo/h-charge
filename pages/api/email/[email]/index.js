
import HttpStatus from 'http-status-codes'
import dbConnect from '../../../../lib/dbConnect'
import moment from 'moment';
import EmailModel from "../../../../models/email"

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'DELETE': {
            return deleteEmail(req, res);
        }
        
    }
}

const deleteEmail = async (req,res)=>{
    const email = req.query.email
    try{
        await dbConnect()
        const foundEmail = await EmailModel.deleteMany({email:email})
        if(foundProject){
            res.status(HttpStatus.ACCEPTED).json({success:true,data:foundEmail})
        }else{
            res.status(HttpStatus.BAD_REQUEST).json({success:false, num:1})
        }
    }catch(e){
        res.status(HttpStatus.CONFLICT).json({success:false, num:2})
    }

}