import mongoose from "mongoose";
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDb = handler => async (req, res) => {
//     if (mongoose.connections[0].readyState){
//         return handler(req, res);
//     }
//     await mongoose.connect(`${process.env.MONGO_URI}`);
//     return handler(req,res);



const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }).then(() => {
    // console.log('connection is successful');
    return handler(req, res);
}).catch((err) => {
    console.log('no connection');
    return handler(req,res);
});


}


export default connectDb;