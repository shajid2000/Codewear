import  mongoose  from "mongoose";


 
const ProductSchema = new mongoose.Schema({
    tittle: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    category: {type: String, required: true},
    size: {type: String, required: true},
    color: {type: String, required: true},
  
    price: {type: Number, required: true},
    availabileQty: {type: Number, required: true}
}, {timestamps: true}

);
mongoose.models = {}
export default mongoose.model("Product", ProductSchema);
