import Order from '../../models/Order'
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    let orders = await Order.find();
    // console.log(orders)
    
   
res.status(200).send(orders);
}

export default connectDb(handler);