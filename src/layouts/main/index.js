import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Container sx={{ pt: 5, height: "100vh" }} maxWidth="sm">
        <Stack spacing={5} alignItems={"center"}>
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
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
