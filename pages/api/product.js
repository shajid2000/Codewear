import mongoose from "mongoose"
import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const Handler = async (req, res) => {
    // if (!mongoose.connections[0].readyState) {
    //     console.log('connecting db');
    //     await mongoose.connect(`${process.env.MONGO_URI}`)
    //     console.log('connected db');  
    //  }

    let products = await Product.find({category: req.query.category});

    let tshirts = {};
    for (let item of products){
        if(item.tittle in tshirts){
            if(!(tshirts[item.tittle].color.includes(item.color)) && item.availabileQty > 0){
                tshirts[item.tittle].color.push(item.color)
            }
            if(!tshirts[item.tittle].size.includes(item.size) && item.availabileQty> 0){
                tshirts[item.tittle].size.push(item.size)
            }
        }
        else {
            tshirts[item.tittle]=JSON.parse(JSON.stringify(item))
            if(item.availabileQty
                 > 0){
                tshirts[item.tittle].color = [item.color]
                tshirts[item.tittle].size = [item.size]
               
            } 
            else{
                tshirts[item.tittle].color = []
                tshirts[item.tittle].size = []
            }
        }
    }
    // console.log(tshirts)

    res.status(200).json(tshirts); 
}

// export default handler;
export default connectDb(Handler);