import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={5} sx={{height:"100vh"}} justifyContent={"center"}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}>
            <img style={{ height: 120, width: 120 }} src={Logo} alt="logo" />
            <Stack alignItems={"center"}>
              <Typography>Login To Talky</Typography>
              <Stack direction={"row"} spacing={0.5}>
                <Typography variant="body2">New User?</Typography>
                <Link
                  to="/auth/register"
                  component={RouterLink}
                  variant="subtitle2">
                  Register
                </Link>
              </Stack>
            </Stack>
          </Stack>
        <Outlet />
        </Stack>

      </Container>
    </>
  );
};

export default MainLayout;
