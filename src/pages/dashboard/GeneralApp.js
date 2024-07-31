import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import NoChat from "../../assets/Illustration/NoChat";
import useResponsive from "../../hooks/useResponsive";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chat_type, room_id, chat } = useSelector(
    (store) => store.app
  );
  const isMobile = useResponsive("between", "md", "xs", "sm");
  return (
    <Stack direction={"row"} sx={{ width: "calc(100vw - 100px)" }}>
      <Chats />
      {(room_id !== null &&
        chat_type === "individual" &&
        chat.open &&
        !isMobile) ||
      (isMobile && !sidebar.open && chat.open) ? (
        <Box
          sx={{
            height: "100%",
            width: !isMobile
              ? sidebar.open
                ? "calc(100vw - 740px)"
                : "calc(100vw - 420px)"
              : "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.default,
          }}>
          <Conversation />
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            width: !isMobile
              ? sidebar.open
                ? "calc(100vw - 740px)"
                : "calc(100vw - 420px)"
              : "0",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.default,
          }}>
          <Stack
            spacing={2}
            sx={{
              height: "100%",
              width: "100%",
              display: isMobile ? "none" : "flex",
            }}
            alignItems={"center"}
            justifyContent={"center"}>
            <NoChat />
            <Typography>Select a Conversation or Start a New One.</Typography>
          </Stack>
        </Box>
      )}
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "SHARED":
              return <SharedMessages />;
            case "STARRED":
              return <StarredMessages />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
