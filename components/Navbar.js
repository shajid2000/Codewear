import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { AiOutlineShoppingCart, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md'
import { IoMdCloseCircle } from 'react-icons/io'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router';


const Navbar = ({ cart, addtoCart, removeFromCart, clearCart, subTotal, user, logout ,admin}) => {

  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter()

  useEffect(() => {

    Object.keys(cart).length !== 0 && setSidebar(true)
    let exempted = ['/checkout', '/order' , '/orders', '/myaccount','/','/tshirts','/login','/signup', '/hoodies','/forgot','/myaccount','/jackets','/formals','/product/[slug]', '/admin', '/admin/add','/admin/[slug]','/admin/addproducts','/admin/orders']
    if(exempted.includes(router.pathname)){
      setSidebar(false)
    }

  }, [])



  const ToggleCart = () => {
    setSidebar(!sidebar)
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full')
    //   ref.current.classList.add('translate-x-0')

    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0')
    //   ref.current.classList.add('translate-x-full')

    // }
  }

  const ref = useRef()
  return (
    <>
      <header className={`text-gray-600 body-font shadow-md sticky top-0 bg-white z-10`}>
        <div className={`container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center ${!sidebar && 'overflow-hidden'}`}>
        <div className='md:mr-0 mr-5'>
          <Link href='/'><a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image className='rounded-full' src="/../public/wear.png" alt='' width={45} height={45} />
            <span className="ml-3 text-xl font-bold text-pink-600">CodeWear</span>
          </a></Link>
        </div>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
       {admin &&  <Link href="/admin"><a className="mr-5 hover:text-gray-900  font-bold text-pink-600">Dashboard</a></Link>}
          <Link href="/tshirts"><a className="mr-5 hover:text-gray-900  font-bold text-pink-600">Tshirts</a></Link>
          <Link href="/hoodies"><a className="mr-5 hover:text-gray-900 font-bold text-pink-600">Hoodies</a></Link>
          <Link href="/formals"><a className="mr-5 hover:text-gray-900 font-bold text-pink-600">Formals</a></Link>
          <Link href="/jackets"><a className="mr-5 hover:text-gray-900 font-bold text-pink-600">Jackets</a></Link>
        </nav>
        <div className="cursor-pointer items-center cart absolute right-0 top-4 mx-5 flex">
          <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
            {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute right-2 bg-white top-7 rounded-md px-5 w-36 shadow-lg">
              <ul>
                <Link href={'/myaccount'}><li className='py-1 hover:text-pink-700 text-sm font-bold'>My Account</li></Link>
                <Link href={'/orders'}><li className='py-1 hover:text-pink-700 text-sm font-bold'>Orders</li></Link>
                <a onClick={logout}><li className='py-1 hover:text-pink-700 text-sm font-bold'>Logout</li></a>
              </ul>
            </div>}
            {user.value && <MdAccountCircle className='text-3xl text-pink-600 mx-2' />}</span>
          {!user.value && <Link href={'/login'}><a>
            <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2'>Login</button></a></Link>}
          <AiOutlineShoppingCart onClick={ToggleCart} className='text-3xl text-pink-600' />
        </div>
        <div ref={ref} className={`sidebar overflow-y-scroll h-[100vh] absolute top-0  bg-pink-100 p-10 transition-transform  ${sidebar ? 'right-2' : 'hidden'}`}>
         
          <h2 className="font-bold text-xl">Shopping Cart {sidebar?'y':'n'}</h2>
          <span onClick={ToggleCart} className='absolute top-2 right-2 cursor-pointer text-2xl text-pink-500'><IoMdCloseCircle /></span>
          <ol className='list-decimal font-semibold'>

            {Object.keys(cart).length == 0 && <div className="my-4 font-normal">Your cart is empty</div>}
            {Object.keys(cart).map((k) => {

              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className='w-2/3 font-semibold' >{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                    <div className='flex w-1/3 font-semibold items-center justify-center'><AiOutlinePlusCircle onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='mx-1 cursor-pointer text-pink-500  hover:text-pink-800' /> <span className='mx-2 text-sm'>{cart[k].qty}</span> <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='mx-1 cursor-pointer text-pink-500  hover:text-pink-800' /> </div>
                  </div>

                </li>)
            })}

          </ol>

          <div className="flex">
            <Link href='/checkout'><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"> <BsFillBagCheckFill /> Checkout</button></Link>
            <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"> Clear Cart</button>
          </div>
        </div>
  </div>
    </header>
    </>
  )
}

export default Navbar