import { Stack, Typography, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from "../../sections/auth/AuthSocial";

const Register = () => {
  return (
    <Stack
      spacing={2}
      sx={{ mb: 5 }}
      position={"relative"}
      justifyContent={"center"}>
      <Stack alignItems={"center"}>
        <Typography>Get Started With Talky</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link to="/auth/login" component={RouterLink} variant="subtitle2">
            Login
          </Link>
        </Stack>
      </Stack>

      <RegisterForm />
      <AuthSocial />
      <Typography
        component={"div"}
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}>
        {"By signing up, I agree to "}
        <Link underline="always" color={"text.primary"}>
          Terms of service
        </Link>
        {" and "}
        <Link underline="always" color={"text.primary"}>
          Privacy Policy
        </Link>
      </Typography>
    </Stack>
  );
};

export default Register;
