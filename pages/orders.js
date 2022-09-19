import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head';

function Orders() {

    const [orders, setOrders] = useState([])
    const router = useRouter();
    useEffect(() => {
        const fetchOrders = async () => {
            let u  = JSON.parse(localStorage.getItem('myuser'))
            let t= u.token;
           
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ token: t })
            })
            let res = await a.json();
            // console.log(res.orders);
            setOrders(res.orders);


        }
        if (!localStorage.getItem('myuser')) {
            router.push('/')
        }
        else {
            fetchOrders();
        }
    }, [])
    return (
        <div>
              <Head>
          <title>Orders-CodeWear</title>
          </Head>
            <h1 className='font-bold text-xl px-8 text-center mt-2'>My Orders</h1>
            <div className="container  mx-auto">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                OrderID
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Email
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Amount
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((item) => {
                                                return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                   
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.orderId}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.email}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.amount}
                                                    </td>
                                                   <Link href={'/order?id='+ item._id}><td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Click me</td></Link>
                                                </tr>
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Orders