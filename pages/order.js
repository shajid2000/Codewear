import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const Order = ({ order, clearCart }) => {
  // console.log(order.orderId)
  const products = order.products;
  const router = useRouter();
  const [date, setDate] = useState()
  useEffect(() => {
    const d = new Date(order.createdAt)
    setDate(d);
    console.log(order.createdAt)
    if (router.query.clearCart == 1) {
      clearCart()
    }

  }, [])


  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
      <Head>
          <title>Order-CodeWear</title>
          </Head>
        <div className="container px-5 mx-auto">
          <div className=" mx-auto flex lg:flex-wrap lg:flex-row flex-col-reverse justify-around ">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear.com</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId} </h1>
              <p className="leading-relaxed mb-4">Your order has been successfully placed. Your payment is {order.status}</p>
              <p className="leading-relaxed mb-4">Your order placed on: {date && date.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
              <div className="flex mb-4 ">
                <a className="a-tag flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Item Description</a>
                <a className="a-tag flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                <a className="a-tag flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>

              </div>
              {Object.keys(products).map((key) => {
                return <div key={key} className="flex  border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-center mx-5  text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
                  <span className="text-center  mx-5  text-gray-900">{products[key].qty}</span>
                  <span className="  mx-16  text-gray-900">{products[key].price} X {products[key].qty} =  {products[key].price * products[key].qty}</span>
                </div>

              })}


              <div className="flex justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">SubTotal: {order.amount}</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>

              </div>
            </div>
            <img alt="ecommerce" style={{ "height": "400px" }} className="lg:w-1/2 p-10 w-full h-75 object-contain object-center rounded" src="model.jpg" />
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  let order = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order?id=${context.query.id}`);
  order = await order.json();
  // console.log(order)
  return {
    props: { order: JSON.parse(JSON.stringify(order)) }

  }
}

export default Order