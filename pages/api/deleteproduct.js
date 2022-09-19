import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {

    let products = await Product.deleteOne({_id: req.body});
    // console.log(products)
    
   res.json({success: true})
// res.status(200).send(products);
}

export default connectDb(handler);