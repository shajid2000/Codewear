import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
            let p = await Product.findByIdAndUpdate(req.query.id, req.body);
           
        
        res.status(200).json({ success: true });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDb(handler);