import Order from '../../models/Order'
import connectDb from '../../middleware/mongoose';
import mongoose from 'mongoose'

const Handler = async (req, res) => {
     
    let order = await Order.findById(req.query.id)
   

   
res.status(200).json(order);
}

export default connectDb(Handler);

