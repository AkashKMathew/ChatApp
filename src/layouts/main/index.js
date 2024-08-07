import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";
import { useSelector } from "react-redux";


const MainLayout = () => {
  const {isLoggedIn} = useSelector((state) => state.auth);


  if(isLoggedIn){
    return <Navigate to="/app"/>
  }
  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={5} sx={{ height: "100dvh" }} justifyContent={"center"}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}>
            <img style={{ height: 120, width: 120 }} src={Logo} alt="logo" />
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export default MainLayout;
