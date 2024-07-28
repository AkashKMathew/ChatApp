import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { showSnackbar } from "../../redux/slices/app";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
      }

      if (!socket) {
        connectSocket(user_id);
        console.log("connecting to socket");
      }

      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_accepted", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
    }

    return () => {
      if (socket) {
        socket.off("new_friend_request");
        socket.off("request_accepted");
        socket.off("request_sent");
      }
    };
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Stack direction={"row"}>
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
