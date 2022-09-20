import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';



const Handler = async (req, res) => {
    
   try {
    let slug=req.query.slug;
    
    let products = await Product.findOne({slug: slug});
    if(products == null){
        res.json(false)
    }
    let variants = await Product.find({tittle: products.tittle})
    let colorSizeSlug = {} 

    for (let item of variants){
        if(Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = {slug: item.slug};
        }
        else{
            colorSizeSlug[item.color] = {};
            colorSizeSlug[item.color][item.size] = {slug: item.slug};
        }
    }  
    // colorSizeSlug = JSON.parse(JSON.stringify(colorSizeSlug));  
    // console.log(colorSizeSlug["black"].M)
res.status(200).json({products,colorSizeSlug});
   } catch (error) {
    console.log(error)
   }
}

export default connectDb(Handler);