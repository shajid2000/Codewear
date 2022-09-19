import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

function Myaccount() {
  const router = useRouter();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({})
  const [password, setPassword] = useState('')
  const [cnpassword, setCnpassword] = useState('')
  const [npassword, setNpassword] = useState('')

  
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
   if(!myuser){
    router.push('/')
   }
    if(myuser && myuser.token){
      setUser(myuser)
      setEmail(myuser.email)  
     fetchData(myuser.token)
    
   }
  }, [])


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
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cnpassword') {
      setCnpassword(e.target.value)
    }
    else if (e.target.name == 'npassword') {
      setNpassword(e.target.value)
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
      if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3) {
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
  useEffect(() => {
    getPinCode(pincode);
  }, [pincode])

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
    setPhone(res.phone)
  setName(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    //  console.log(res)
  }

  const handleUserSubmit = async ()=> {
    let data = {token: user.token,address , name, phone, pincode}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let res = await a.json()
    // console.log(res)
    if(res.success){
      toast.success("Successfully Updated!", {
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

    const handlePasswordSubmit = async ()=> {
      let res;
      if(npassword == cnpassword) {
      let data = {token: user.token, password, cnpassword, npassword}
      console.log('shjid')
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
       res = await a.json()
       console.log("res")
    }
    else{
res= {success: false}
    }
      // console.log(res)
      if(res.success){
        toast.success(res.message, {
          position: "top-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        toast.error(res.message, {
          position: "top-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setPassword('')
      setNpassword("")
      setCnpassword('')
      
    
    }
  
  
 return (
    <div className="container mx-auto">
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
          <title>MyAccount-CodeWear</title>
          </Head>
      <h1 className='text-2xl text-center font-bold my-2'>Update your Account</h1>
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
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated)</label>
            {(user && user.token) ? <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            }
          </div>
        </div>

      </div>
      <div className="w-full px-2">
        <div className="relative flex-grow w-full">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address} name="address" id="address" cols="" rows="1" className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'></textarea>
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
      <button onClick={handleUserSubmit} className="disabled:bg-pink-300 flex m-2 mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Submit</button>
      <h2>Change Password</h2>
        <div className="mx-auto flex">
          <div className="w-1/3 px-2">
            <div className="relative flex-grow w-full">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

          </div>
          <div className="w-1/3 px-2">
            <div className="relative flex-grow w-full">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600"> New Password</label>
              <input onChange={handleChange} value={npassword} type="password" id="cpassword" name="npassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

          </div>
          <div className="w-1/3 px-2">
            <div className="relative flex-grow w-full">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
              <input onChange={handleChange} value={cnpassword} type="password" id="npassword" name="cnpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

          </div>

        </div>
        <button onClick={handlePasswordSubmit} className="disabled:bg-pink-300 flex m-2 mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Change</button>
      </div>
      )
}

export default Myaccount