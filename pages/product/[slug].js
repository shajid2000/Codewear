import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';
import Head from 'next/head';



const Slug = ({ cart, addtoCart, removeFromCart, clearCart, subTotal, product, variants, buyNow, error }) => {
  // console.log(variants)
  const router = useRouter();
  const {slug} = router.query;
  const [Pin, setPin] = useState("");
  const [service, setservice] = useState(null)
  const [color, setColor] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    if(!error){
      setColor(product.color)
      setSize(product.size)
    }
   
  // console.log(product.availabileQty)
    
  }, [router.query])
  


  const checkServiceAbility = async () => {
    let pin = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pin.json();

    if (Object.keys(pinJson).includes(Pin)) {
      setservice(true);
      toast.success('🦄 Wow! We are avialable here', {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      setservice(false);
      toast.error('🦄 Soory! Not Serviceble', {
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

 

  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`
    router.push(url);
  }
  if(error == 404){
    return <Error statusCode={404}/>
  }
  // console.log(color)
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
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
          <title>Product-CodeWear</title>
          </Head>
        <div className="container px-5 mt-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap justify-between">
            <div className="lg:w-1/3 w-full lg:h-auto h-64 justify-center ">
              <Image alt="ecommerce" className=" mt-6 rounded" src={product.img} width={1000} height={900}></Image>
              {/* {product.img} */}
            </div>
            <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.tittle} ({product.size}/{product.color})</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}.</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVariant(size, 'red') }} className={`border-2 border-t-gray-300 px-1 ml-1 bg-red-700 rounded-full w-5 h-5 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'blue') }} className={`border-2 border-t-gray-300 px-1 ml-1 bg-blue-700 rounded-full  w-5 h-5 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => { refreshVariant(size, 'black') }} className={`border-2  px-1 ml-1 bg-black rounded-full  w-5 h-5 focus:outline-none ${color === 'black' ? 'border-orange-600' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVariant(size, 'green') }} className={`border-2 border-t-gray-300 px-1 ml-1 bg-green-700 rounded-full  w-5 h-5 focus:outline-none ${color === '' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => { refreshVariant(size, 'yellow') }} className={`border-2 border-t-gray-300 px-1 ml-1 bg-yellow-300 rounded-full  w-5 h-5 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVariant(size, 'purple') }} className={`border-2 border-t-gray-300 px-1 ml-1 bg-purple-700 rounded-full  w-5 h-5 focus:outline-none ${color === 'purple' ? 'border-black' : 'border-gray-300'}`}></button>}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {color && Object.keys(variants[color]).includes('S') && <option>S</option>}
                      {color && Object.keys(variants[color]).includes('M') && <option>M</option>}
                      {color && Object.keys(variants[color]).includes('L') && <option>L</option>}
                      {color && Object.keys(variants[color]).includes('XL') && <option>XL</option>}
                      {color && Object.keys(variants[color]).includes('XXL') && <option>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" stroklinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
               {product.availabileQty> 0 && <span className="title-font font-medium text-2xl text-gray-900">Rs. {product.price}</span>}
               {product.availabileQty<= 0 && <span className="title-font font-medium text-2xl text-gray-900">Out of stock!</span>}
                <button disabled={product. availabileQty <=0 ? true: false} onClick={() => { buyNow(slug, 1, product.price, product.tittle, size, color) }} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-300">Buy Now</button>
                <button disabled={product. availabileQty <=0 ? true: false} onClick={() => { addtoCart(slug, 1, product.price, product.tittle, size, color) }} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded  disabled:bg-pink-300">Add to Cart</button>

              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input placeholder='Pin' onChange={(e) => {
                  setPin(e.target.value)
                }} className='px-2 border-2 border-gray-400 rounded-md' value={Pin} type="text" />
                <button onClick={checkServiceAbility} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Check</button>



              </div>
              {(!service && service !== null) && <div className="text-red-700 text-sm mt-3 ">Soory! we do not deliver to this pincode yet</div>
              }
              {(service && service !== null) && <div className="text-green-700 text-sm mt-3 ">Yay! this pincode is servicable</div>
              }

            </div>
          </div>
        </div>
      </section>
    </div>
  )        
}

export async function getServerSideProps(context) {
let error=null;
  let product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/slugapi?slug=${context.query.slug}`);
 
  
  let productjson = await product.json();
  // console.log(productjson)
  if(!productjson){
    // console.log('404')
    return {
      props: {error: 404}
    }
  }
  
  // console.log(JSON.parse(JSON.stringify(productjson)))
  const { products, colorSizeSlug } = productjson

  return {
    props: {error: error, product: JSON.parse(JSON.stringify(products)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }

  }
}

export default Slug