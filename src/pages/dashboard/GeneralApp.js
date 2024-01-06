import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);

  return (
    <Stack direction={"row"} sx={{ width: "100vw" }}>
      <Chats />
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          width: sidebar.open ? "calc(100vw-740px)" : "calc(100vw-420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}>
        <Conversation />
      </Box>
      {sidebar.open && <Contact />}
    </Stack>
  );
};

export default GeneralApp;
