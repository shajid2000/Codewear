import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import Homei from '../components/Homei'


export default function Home() {
  return (
    <>
       <div> <Head>
          <title>CodeWear</title>
          <meta name="description" content="Lets wear the code" />
         
          </Head></div>
         
     <Homei/>
   
     </>
  )
}
