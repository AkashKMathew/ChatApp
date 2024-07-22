import { Stack, Typography } from "@mui/material";
import React from "react";
import VerifyForm from "../../sections/auth/VerifyForm";

const Verify = () => {
  return (
    <>
      <Stack
        sx={{ mb: 2 }}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}>
        <Typography variant="h4" paragraph>
          Please verify OTP
        </Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Sent to email (abc@gmail.com)</Typography>
        </Stack>
      </Stack>
      <VerifyForm />
    </>
  );
};

export default Verify;
