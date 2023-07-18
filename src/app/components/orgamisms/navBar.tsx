"use client";
import React, { useEffect, useState } from "react";
import "./navBar.css";
import {
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Box,
  Toolbar,
  AppBar,
  Drawer,
  Avatar,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

import { logout, useAuth } from "@/app/utils/auth";


// https://react-bootstrap.github.io/components/navbar/
export default function NavBar() {
  const { isLoggedIn, isLoading, auth } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return null;

  const login_section = (
    <>
      {!isLoggedIn ? (
        <Link href="/login" passHref>
          <IconButton edge="start" aria-label="search">
            <LoginIcon style={{ marginLeft: "0.2rem", color:"black" }} />
            <Typography
              color="inherit"
              variant="h5"
              style={{ marginLeft: "0.2rem", color:"black" }}
            >
              Login
            </Typography>
          </IconButton>
        </Link>
      ) : (
        <>
          <Tooltip title={auth.currentUser?.email} arrow>
            <AccountCircleIcon sx={{ fontSize:50, color:"black"}} />
          </Tooltip>
          <IconButton
            edge="start"
            aria-label="search"
            onClick={() => logout(auth)}
            style={{ marginLeft: "0.2rem", color:"black" }}
          >
            <LoginIcon/>
            <Typography
              color="inherit"
              variant="h5"
              style={{ marginLeft: "0.2rem", color:"black" }}
            >
              Logout
            </Typography>
          </IconButton>
        </>
      )}
    </>
  );

  const home_link = (
    <>
      <Link href="/" passHref>
        <IconButton
          edge="start"
          aria-label="search"
          style={{ marginLeft: "0.2rem" }}
        >
          <Avatar alt="Braedens Consulting" src="/favicon.ico" sx={{ marginRight: 2 , width:100, height:100 }}/>
        </IconButton>
      </Link>
    </>
  );

  const map_link = (
    <>
      <Link href="/map" passHref>
        <IconButton
          edge="start"
          aria-label="search"
          style={{ marginLeft: "0.2rem" }}
        >
          <Typography
            color="inherit"
            variant="h5"
            style={{ marginLeft: "0.2rem", color:"black" }}
          >
            Map
          </Typography>
        </IconButton>
      </Link>
    </>
  );

  const resume_link = (
    <div>
      <IconButton
          edge="start"
          aria-label="search"
          style={{ marginLeft: "0.2rem" }}
          aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        >
          <Typography
            color="inherit"
            variant="h5"
            style={{ marginLeft: "0.2rem", color:"black" }}
          >
            Resume
          </Typography>
        </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem><Link href="/myResume" passHref>
            <IconButton
              edge="start"
              aria-label="search"
              style={{ marginLeft: "0.2rem" }}
            >
              <Typography
                color="inherit"
                variant="h5"
                style={{ marginLeft: "0.2rem", color:"black" }}
              >
                My Resume
              </Typography>
            </IconButton>
          </Link></MenuItem>
        <MenuItem>
          <Link href="/resumeBuilder" passHref>
            <IconButton
              edge="start"
              aria-label="search"
              style={{ marginLeft: "0.2rem" }}
            >
              <Typography
                color="inherit"
                variant="h5"
                style={{ marginLeft: "0.2rem", color:"black" }}
              >
                Resume Builder
              </Typography>
            </IconButton>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'transparent', paddingTop: '1rem', boxShadow: 'none'  }}>
      <Toolbar>
        {windowSize <= 600 ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon sx={{ color:"black"}} />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerClose}
            >
              <Box style={{ width: 250 }}>
                <Box my={2}>{home_link}</Box>
                <Box my={2}>{map_link}</Box>
                <Box my={2}>{resume_link}</Box>
                <Box my={2} style={{ marginLeft: "0.6rem" }}>
                  {login_section}
                </Box>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            {home_link}
            {map_link}
            {resume_link}
            <div style={{ flexGrow: 1 }} />
            {login_section}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
