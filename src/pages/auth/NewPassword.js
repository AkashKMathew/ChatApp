import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import NewPassForm from "../../sections/auth/NewPassForm";

const NewPassword = () => {
  return (
    <>
      <Stack
        sx={{ mb: 2 }}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}>
        <Typography variant="h3" paragraph>
          Reset Password
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          Please set your new password
        </Typography>
      </Stack>

        <NewPassForm/>

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
    </>
  );
};

export default NewPassword;
