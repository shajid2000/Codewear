import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';


const Handler = async (req, res) => {
    //  console.log(req.query.id)
    let order = await Product.findById(req.query.id)
   

   
res.status(200).json(order);
}

export default connectDb(Handler);