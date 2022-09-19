import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    let products = await Product.find();
    
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
        }
    }
res.status(200).json({tshirts});
}

export default connectDb(handler);