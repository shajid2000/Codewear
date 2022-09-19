import connectDb from "../../middleware/mongoose"
import Order from '../../models/Order'
import mongoose from 'mongoose'
import Product from "../../models/Product"
import PaytmChecksum from 'paytmchecksum';



  const handler = async (req,res) => {
  
let order = await Order.findOne({orderId: req.body.ORDERID})

var paytmChecksum = "";
var paytmParams = {}

const received_data = req.body;
for(var key in received_data){
  if(key == 'CHECKSUMHASH'){
    paytmChecksum = received_data[key];
  }
  else {
    paytmParams[key] = received_data[key];
  }
}

var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
if (!isValidChecksum) {
res.status(500).send('some errer occurrd')
return
}
// else{
//   res.status(200).send('ok') 
// }


 if(req.body.STATUS == 'TXN_SUCCESS'){ 

   order = await Order.findOneAndUpdate({orderId: req.body.ORDERID} , {status: 'Paid', paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID})
   let products = order.products;
   for(let slug in products){
await Product.findOneAndUpdate({slug: slug}, {$inc: {"availabileQty": - products[slug].qty}})
   }
 }
 else if(req.body.STATUS == 'PENDING'){
   order = await Order.findOneAndUpdate({orderId: req.body.ORDERID} , {status: 'Pending', paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID})
 }
  //  res.redirect('/order?id=631dd6ab591bf91d381beecb', 200)
   res.redirect('/order?clearCart=1&id=' + order._id, 200)

// res.status(200).json(req.body)
  }
  export default connectDb(handler)