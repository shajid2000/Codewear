import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { AiOutlineShoppingCart, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { IoMdCloseCircle } from 'react-icons/io'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Head from 'next/head'
import Script from 'next/script'
const PaytmChecksum = require('paytmchecksum');
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, clearCart, addtoCart, removeFromCart, subTotal }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
   if(myuser){
    if(myuser.token){

     const {token, email} = myuser
      setUser(token)
      // console.log(myuser.token)
      // console.log(user)
      setEmail(myuser.email)  
      fetchData(myuser.token)
    }
   }
  }, [])

  const fetchData = async (token)=> {
    let data = {token: token}
    // console.log(data.token)
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let res = await a.json()
    // console.log(res.phone)
    // console.log(res.name)
    // console.log(res.address)
    // console.log(res.pincode)
    // // console.log(res)

    setName(res.name)
    setAddress(res.address)
    setPhone(res.phone)
    setPincode(res.pincode)
    getPinCode(res.pincode)
    p(res.phone)
  }


  const p= (p)=> {
    setPhone(p)
  }

  const handleChange = async (e) => {



    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
       getPinCode(e.target.value);
      }
      else {
        setState('')
        setCity('')
      }
    }
    setTimeout(() => {
      if (name.length > 3 && email.length > 3 && phone.length>3 && address.length > 3) {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
    }, 100)
  }


  const getPinCode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1])
      setCity(pinJson[pin][0])
    }
    else {
      setState('')
      setCity('')
    }
  }


  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now())

    const data = { cart, subTotal, oid, email, name, address, pincode, phone,city,state }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let txnRes = await a.json()
    // console.log(txnRes)
    if (txnRes.success) {
      let txnToken = txnRes.txnToken

      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid, /* update order id */
          "token": txnToken, /* update token value */
          "tokenType": "TXN_TOKEN",
          "amount": subTotal /* update amount */
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });
    }
    else {
      if(txnRes.cartClear){
        clearCart();
      }
      toast.error(txnRes.error, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
   

    return (
      <div className='container m-auto'>
        <ToastContainer
          position="top-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Head>
          <title>Checkout-CodeWear</title>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
        <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" />
        <h1 className="font-bold text-3xl my-3 text-center">Checkout</h1>
        <h2>Delivery Details</h2>
        <div className="mx-auto flex">
          <div className="w-1/2 px-2">
            <div className="relative flex-grow w-full">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

          </div>
          <div className="w-1/2 px-2">
            <div className="relative flex-grow w-full">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              {(user) ? <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly/> : <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              }
            </div>
          </div>

        </div>
        <div className="w-full px-2">
          <div className="relative flex-grow w-full">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} value={address} name="address" id="address" cols="" rows="2" className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></textarea>
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="w-1/2 px-2">
            <div className="relative flex-grow w-full">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
              <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" placeholder='Your 10 digit phone no.' className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

          </div>
          <div className="w-1/2 px-2">
            <div className="relative flex-grow w-full">
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">pincode</label>
              <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

        </div>
        <div className="mx-auto flex">
          <div className="w-1/2 px-2">
            <div className="relative flex-grow w-full">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
              <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
            </div>

          </div>
          <div className="w-1/2 px-2">
            <div className="relative flex-grow w-full">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
            </div>
          </div>

        </div>
        <h2 className='my-4'>Review Cart Items</h2>
        <div className="sidebar  bg-pink-100 p-10 transition-transform  z-20">
          <ol className='list-decimal font-semibold'>

            {Object.keys(cart).length == 0 && <div className="my-4 font-normal">Your cart is empty</div>}
            {Object.keys(cart).map((k) => {

              return (
                <li key={k}>
                  <div className="item flex my-5 justify-around">
                    <div className=' font-semibold' >{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                    <div className='flex w-1/3 font-semibold items-center justify-center'><AiOutlinePlusCircle onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='mx-1 cursor-pointer text-pink-500  hover:text-pink-800' /> <span className='mx-2 text-sm'>{cart[k].qty}</span> <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='mx-1 cursor-pointer text-pink-500  hover:text-pink-800' /> </div>
                  </div>

                </li>)
            })}
          </ol>

          <div className='flex justify-center'> <span className="total font-bold">Subtotal: {subTotal} </span></div>
          <div className="flex">

            <button onClick={clearCart} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"> Clear Cart</button>
          </div>
        </div>
        <Link href='/checkout'><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-pink-300 flex m-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"> <BsFillBagCheckFill />Pay - {subTotal}</button></Link>
      </div>
    )
  
}
export default Checkout