import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "demo@gmail.com",
    password: "demo123",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data to the server
    } catch (e) {
      console.log(e);
      reset();
      setError("afterSubmit", {
        ...e,
        message: e.message,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField
          name="email"
          label="Email address"
          helperText="Enter your email"
        />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          helperText="Enter your password"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems={"flex-end"} sx={{ mt: 2 }}>
        <Link variant="body2" color={"inherit"} underline="always">
          Forgot password?
        </Link>
      </Stack>
      <Button
        fullWidth
        color="inherit"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover":{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          }
        }}
        disabled={isSubmitting}>
        Login
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
