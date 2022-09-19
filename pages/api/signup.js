import User from "../../models/User";
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");

const Handler = async (req, res) => {
    if (req.method == "POST") {
        // console.log(req.body)
        const {name, email} = req.body
        let U = await new User({name,email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})
        await U.save();

            res.status(200).json(U)
    }
    else{
        res.status(200).json({error: "this method is not allowed"})
    }
}

export default connectDb(Handler);