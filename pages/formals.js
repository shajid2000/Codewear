import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'




const stickers = ({ products }) => {
  // console.log(products);

  return (
    <div>
        <Head>
          <title>Formals-CodeWear</title>
          </Head>
          <section className=" text-gray-600 body-font">
      <div className="container px-5 mt-3 md:m-8 mx-auto">
        <div className="flex flex-wrap m-4 ">
          
          {Object.keys(products).length === 0 && <p>Soory! all the Formals are currently out of stock</p>}
          {
            Object.keys(products).map((items) => {

              return (<Link passHref={true} key={products[items]._id} href={`/product/${products[items].slug}`}><div className="lg:w-1/3 md:w-1/2 p-4 w-full cursor-pointer shadow-lg">
                <a className="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" src={products[items].img} layout='fill'></Image>
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Tshirt</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[items].tittle}</h2>
                  <p className="mt-1">Rs.{products[items].price}</p>
                  <div className="mt-1">
                    {products[items].size.includes('S') && <span className='border border-t-gray-600 px-1 mx-1'>S</span>}
                    {products[items].size.includes('M') && <span className='border border-t-gray-600 px-1 mx-1'>M</span>}
                    {products[items].size.includes('L') && <span className='border border-t-gray-600 px-1 mx-1'>L</span>}
                    {products[items].size.includes('XL') && <span className='border border-t-gray-600 px-1 mx-1'>XL</span>}
                    {products[items].size.includes('XXL') && <span className='border border-t-gray-600 px-1 mx-1'>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {products[items].color.includes('red') && <button className='border-2 border-t-gray-300 px-1 ml-1 bg-red-700 rounded-full w-5 h-5 focus:outline-none'></button>}
                    {products[items].color.includes('blue') && <button className='border-2 border-t-gray-300 px-1 ml-1 bg-blue-700 rounded-full  w-5 h-5 focus:outline-none'></button>}
                    {products[items].color.includes('black') && <button className='border-2 border-t-gray-300 px-1 ml-1 bg-black rounded-full  w-5 h-5 focus:outline-none'></button>}
                    {products[items].color.includes('green') && <button className='border-2 border-t-gray-300 px-1 ml-1 bg-green-700 rounded-full  w-5 h-5 focus:outline-none'></button>}
                    {products[items].color.includes('yellow') && <button className='border-2 border-t-gray-300 px-1 ml-1 bg-yellow-300 rounded-full  w-5 h-5 focus:outline-none'></button>}
                    {products[items].color.includes('purple') && <button className='border-2 border-t-gray-300 px-1 ml-1 bg-purple-700 rounded-full  w-5 h-5 focus:outline-none'></button>}
                  </div>
                </div>
              </div></Link>)
            })}


        </div>
      </div>
    </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  let products = await fetch('http://localhost:3000/api/product?category=formal');
  products = await products.json();
  // console.log(products)
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }

  }
}

export default stickers 