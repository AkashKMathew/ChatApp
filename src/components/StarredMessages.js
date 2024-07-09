import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import Message from "./Conversation/Message";
import { SimpleBarStyle } from "./Scrollbar";

const StarredMessages = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "F8FAFF"
                : theme.palette.background,
          }}>
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            spacing={3}>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>
        <SimpleBarStyle
          style={{ flexGrow: 1, maxHeight: "100%", overflow: "auto" }}
          timeout={500}
          clickOnTrack={false}>
          <Stack
            sx={{
              height: "100%",
              position: "relative",
            }}
            p={3}
            spacing={3}>
            <Message menu={false} />
          </Stack>
        </SimpleBarStyle>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
