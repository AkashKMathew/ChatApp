import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { SelectConv, showSnackbar } from "../../redux/slices/app";
import {
  AddCurrentMessage,
  AddDirectConv,
  UpdateDirectConv,
} from "../../redux/slices/conv";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { conv, current_conv } = useSelector(
    (state) => state.conv.direct_chat
  );

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

      socket.on("start_chat", (data) => {
        console.log(data);
        const existing_conv = conv.find((el) => el.id === data._id);
        if (existing_conv) {
          dispatch(UpdateDirectConv({ conv: data }));
        } else {
          dispatch(AddDirectConv({ conv: data }));
        }
        dispatch(SelectConv({ room_id: data._id }));
      });

      socket.on("new_message", (data) => {
        const message = data.message;

        if (current_conv?.id === data.conv_id) {
          const current_message = {
            id: message._id,
            type: "msg",
            subtype: message.type,
            message: message.text,
            incoming: message.to === user_id,
            outgoing: message.from === user_id,
          };
          dispatch(
            AddCurrentMessage({current_message})
          );
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("new_friend_request");
        socket.off("request_accepted");
        socket.off("request_sent");
        socket.off("start_chat");
        socket.off("new_message");
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
