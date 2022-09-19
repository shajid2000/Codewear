import connectDb from '../../middleware/mongoose';
import User from '../../models/User'
import jsonwebtoken from 'jsonwebtoken'
var CryptoJS = require('crypto-js')
const handler = async (req, res) => {
    if (req.method == "POST") {
       let token = req.body.token
       let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    //    console.log(user)
    let dbuser = await  User.findOne({email: user.email})
    const bytes =  CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    if(decryptedPass == req.body.password && req.body.npassword == req.body.cnpassword){
        let dbuseru = await  User.findOneAndUpdate({email: dbuser.email}, {password:  CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString()})
        console.log(decryptedPass)
        res.status(200).json({success: true, message: "Password is updated"})
        return
    }
    res.status(200).json({success: false, message: "Password is incorrect"})
}
    else{
        res.status(200).json({success: false, message: "invalid request"})
    }
        // let user = await User.find({email: req.body.email})
      
    

}

export default connectDb(handler);