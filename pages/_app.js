import Router from 'next/router';
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState()
  const [subTotal, setSubTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter()
  const[admin,setAdmin]= useState(false)



  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {}
     newCart[itemCode] = { qty, price, name, size, variant };
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  // const ToggleCart = () => {
  //   if (ref.current.classList.contains('translate-x-full')) {
  //     ref.current.classList.remove('translate-x-full')
  //     ref.current.classList.add('translate-x-0')

  //   }
  //   else if (!ref.current.classList.contains('translate-x-full')) {
  //     ref.current.classList.remove('translate-x-0')
  //     ref.current.classList.add('translate-x-full')

  //   }
  // }

  useEffect(() => {
    router.events.on('routeChangeStart', ()=> {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', ()=> {
      setProgress(100);
    })
    try {

      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }

    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
      // console.log(admin)
      setUser({value: myuser.token, email: myuser.email})
      let a= `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`
      // console.log(a)
      if(myuser.email == a){
        setAdmin(true)
        console.log(admin)
      }
     
    }
    setKey(Math.random())
  }, [router.query])


const logout= ()=> {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
     
      let a= `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`
      if(myuser.email == a){
       setAdmin(false)
      }
    }
    localStorage.removeItem('myuser')
    setUser({value: null})
    setKey(Math.random())
  router.push('/')
}
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }

  const addtoCart = (itemCode, qty, price, name, size, variant) => {
    if(Object.keys(cart).length == 0){
      setKey(Math.random())
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
      
    }
    setCart(newCart);

    saveCart(newCart);
    toast.success('🦄 Added to the Cart', {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];

    }
    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart = () => {
   setCart({});
   saveCart({});
  }

  return (
    <>
     <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime= {400}
        onLoaderFinished={() => setProgress(0)}
      />
 
     { key && <Navbar admin={admin} logout={logout} user={user} key={key}  cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
      <Component user={user} buyNow={buyNow} cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    
      <Footer />
    </>
  )
}

export default MyApp
