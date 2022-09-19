import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FullLayout from "../../src/layouts/FullLayout"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../../src/theme/theme"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

function Edit({products}) {
  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
     
      let a= `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`
      if(myuser.email != a){
        router.push('/')
      }
    }
  }, [])
  const [form, setForm] = useState({})
  const onChangee = (e) => {
    setForm({
      ...form,
       [e.target.name]: e.target.value
    })
  }
useEffect(() => {

setForm(products)
 
}, [])

// useEffect(() => {

//  console.log(form)
   
//   }, [onChangee])



const submitForm= async (e)=> {
e.preventDefault()
const {tittle, slug, img, desc, category, size, color , price, availabileQty}= form;
let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts?id=${products._id}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({tittle, slug, img, desc, category, size, color , price, availabileQty})
})
let res = await a.json()
console.log(res)
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
router.push('/admin/allproducts')
}

}

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
          <Grid item xs={12} lg={12}>
            <BaseCard title="Update Product">
              <Stack spacing={2}>
                <TextField
                  onChange={onChangee} value={form.tittle?form.tittle: ""} name="tittle"
                  label="Tittle"
                  variant="outlined"
                />
                <TextField onChange={onChangee} value={form.slug?form.slug: ""} name="slug" label="Slug" variant="outlined" />
                <TextField onChange={onChangee} value={form.img?form.img: ""} name="img" label="Image Url" variant="outlined" />
                <TextField
                  onChange={onChangee} value={form.desc?form.desc: ""} name="desc"
                  label="Description"
                  multiline
                  rows={2}
                />
                <TextField onChange={onChangee} value={form.category?form.category: ""} name="category" label="Category" variant="outlined" />
                <TextField onChange={onChangee} value={form.size?form.size: ""} name="size" label="Size" variant="outlined" />
                <TextField onChange={onChangee} value={form.color?form.color: ""} name="color" label="Color" variant="outlined" />
                <TextField onChange={onChangee} value={form.price?form.price: ""} name="price" label="Price" variant="outlined" /> <TextField onChange={onChangee} value={form.availabileQty?form.availabileQty: ""} name="availabileQty" label="Avialable-Qty" variant="outlined" />
              </Stack>
              <div className="">
                <button onClick={submitForm} className='bg-white mx-auto border border-slate-900 rounded-lg p-3 my-3 hover:bg-green-400 hover:text-white'>submit</button>

              </div>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}
export async function getServerSideProps(context){
  // console.log(context.query.edit)
  let products = await fetch(`http://localhost:3000/api/singleproduct?id=${context.query.edit}`);
  products = await products.json();
  // console.log(products)
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }

  }
}

export default Edit