import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method == 'POST') {
      
      
            let p = new Product({
                tittle: req.body.tittle,
                slug: req.body.slug,
                desc: req.body.dec,
                img: req.body.img,
                category: req.body.category,
                size: req.body.size,
                color: req.body.color,
                price: req.body.price,
                availabileQty: req.body.availabileQty
            });
            await p.save();
        res.status(200).json({ success: true });
    }
    else {
        res.status(400).json({ success: false });
    }
}

export default connectDb(handler);