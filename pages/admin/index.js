import { Grid } from "@mui/material";

import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import FullLayout from "../../src/layouts/FullLayout"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../../src/theme/theme" 
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
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
     
    <FullLayout>
      <h1 className="text-center text-3xl">Admin Panel</h1>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
     
    </Grid>
    </FullLayout>
      </ThemeProvider>
  );
}
