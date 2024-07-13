import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordForm from "../../sections/auth/ResetPassForm";

const ResetPassword = () => {
  return (
    <Stack
      spacing={2}
      sx={{ mb: 5 }}
      position={"relative"}
      justifyContent={"center"}>
      <Stack alignItems={"center"}>
        <Typography variant="h3" paragraph>
          Forgot your Password?
        </Typography>
        <Typography>
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>
      </Stack>
      <ResetPasswordForm />
      <Link
        component={RouterLink}
        to="/auth/login"
        color={"inherit"}
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        }}>
        <CaretLeft />
        Back to Login
      </Link>
    </Stack>
  );
};

export default ResetPassword;
