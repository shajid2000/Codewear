import connectDb from '../../middleware/mongoose';
import User from '../../models/User'
import jsonwebtoken from 'jsonwebtoken'
const handler = async (req, res) => {
    if (req.method == "POST") {
       let token = req.body.token
       let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    //    console.log(user)
    let dbuser = await  User.findOneAndUpdate({email: user.email},{address: req.body.address, pincode: req.body.pincode, phone: req.body.phone, name: req.body.name})
        // let user = await User.find({email: req.body.email})
      
        res.status(200).json({success: true})
        
    
}
else {
    res.status(400).json({ success: false})
}
}

export default connectDb(handler);