import React from 'react'
import Script from 'next/script'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font mb-3">
        <div className="flex items-center justify-center">
          <div className="m-2 max-w-5xl items-center">
            <div className="flex flex-col items-center"> <img className="flex m-1 mt-2 rounded-full w-20 h-18" src="wear.png" />
              <div className="m-2"> 
              <Link href={"https://codepen.io/shajid2000/full/gOeMzqN"}>
              <a 
                className="w-9 h-10 text-center border-current border-2 text-violet-600 hover:text-black pt-1 inline-block"><i
                  className="fa fa-address-book m-2"></i></a>
              </Link>
              <Link href={"https://www.instagram.com/mdshajid2000/"}>
              <a 
                className="w-9 h-10 text-center border-current border-2 text-violet-600 hover:text-black pt-1 inline-block"><i
                  className="fa fa-instagram m-2"></i></a>
              </Link>
              <Link href={"https://www.linkedin.com/in/md-shajid-86a433231"}>
              <a 
                className="w-9 h-10 text-center border-current border-2 text-violet-600 hover:text-black pt-1 inline-block"><i
                  className="fa fa-linkedin m-2"></i></a>
              </Link>
               </div>
              <div className="flex md:flex-row flex-col">
                <Link href="/">
                <p className="hover:text-blue-600 text-gray-500 font-medium m-2"> <a >Home</a> </p></Link>
                <Link href="/tshirts"><p className="hover:text-blue-600 text-gray-500 font-medium m-2"> <a >Tshirts</a></p></Link>
                <Link href="/hoodies">
                <p className="hover:text-blue-600 text-gray-500 font-medium m-2"> <a >Hoodies</a></p>
                </Link>
               <Link href="/formals">
                <p className="hover:text-blue-600 text-gray-500 font-medium m-2"> <a >Formals </a> </p></Link>
                <Link href="/jackets">
                <p className="hover:text-blue-600 text-gray-500 font-medium m-2"> <a > Jackets </a> </p>
                </Link>
               
              </div>
              <div className="text-gray-500 font-medium mt-4 text-xs"> Copyright 2022. All rights reserved by <a href=""
                className="text-blue-600">CodeWear</a> </div>
            </div>
          </div>
        </div>
        <Script src="https://use.fontawesome.com/03f8a0ebd4.js"></Script>
 
      </footer>
    </>
  )
}

export default Footer