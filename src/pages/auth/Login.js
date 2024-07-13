import { Stack } from "@mui/material";
import React from "react";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

const Login = () => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{ mb: 5 }}
        position={"relative"}
        justifyContent={"center"}>
        <Stack alignItems={"center"}>
          <Typography variant="h3">Login To Talky</Typography>
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
        <LoginForm />
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Login;
