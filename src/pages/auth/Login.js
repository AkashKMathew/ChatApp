import { Stack } from "@mui/material";
import React from "react";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{ mb: 5 }}
        position={"relative"}
        justifyContent={"center"}>
        <LoginForm />
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Login;
