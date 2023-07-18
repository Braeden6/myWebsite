"use client";
import { AuthProvider } from "../utils/auth";
// import DefaultLayout from "@/app/components/templates/defaultLayout";
import Login from "./register";
import { Box } from "@mui/material";


export default function MainLogin() {
    return (
      
      <AuthProvider>
        <Box sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url('/auth-background.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Login/>
        </Box>
      </AuthProvider>
    );
}
// braeden.norman6@gmail.com
// test1234