"use client";
import NavBar from "../components/orgamisms/navBar";
import { AuthProvider } from "../utils/auth";
import Login from "./login";
import { Box } from "@mui/material";

export default function MainLogin() {
  return (
    <AuthProvider>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url('/auth-background.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <NavBar />
        <Login />
      </Box>
    </AuthProvider>
  );
}
