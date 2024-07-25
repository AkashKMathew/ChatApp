import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: "",
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export default slice.reducer;

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response?.data.message,
          })
        );
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    dispatch(slice.actions.signOut());
    dispatch(
      showSnackbar({
        severity: "success",
        message: "Logged out successfully",
      })
    );
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response?.data.message,
          })
        );
      });
  };
}

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.response?.data.message,
          })
        );
      });
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateLoading({
        isLoading: true,
        error: false,
      })
    );
    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateRegisterEmail({
            email: formValues.email,
          })
        );
        dispatch(
          slice.actions.updateLoading({
            isLoading: false,
            error: false,
          })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          slice.actions.updateLoading({
            isLoading: false,
            error: true,
          })
        );
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "success",
            message: error.response?.data.message,
          })
        );
      })
      .finally(() => {
        if (!getState().auth.error) window.location.href = "/auth/verify";
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/verify-otp",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          slice.actions.updateLoading({
            isLoading: false,
            error: false,
          })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          slice.actions.updateLoading({
            isLoading: false,
            error: true,
          })
        );
        dispatch(
          showSnackbar({
            severity: "success",
            message: error.response?.data.message,
          })
        );
      })
      .finally(() => {
        if (!getState.auth.error) window.location.href = "/auth/login";
      });
  };
}
