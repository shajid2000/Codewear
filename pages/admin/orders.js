import React, { useEffect } from 'react'
import FullLayout from "../../src/layouts/FullLayout"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../../src/theme/theme"
import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/AllProduct";
import {useRouter} from 'next/router'

function Orders({products}) {

  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
     
      let a= `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`
      if(myuser.email != a){
        router.push('/')
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {`
          footer {
            display: none;
          }
          
       `}
      </style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <ProductPerfomance products={products}/>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>

  )
}

export async function getServerSideProps(context){
  let products = await fetch('http://localhost:3000/api/admingetorders');
  products = await products.json();
  // console.log(products)
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }

  }
}

export default Orders