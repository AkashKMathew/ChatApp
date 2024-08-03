import React, { useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { SimpleBarStyle } from "../Scrollbar";
import { useSelector } from "react-redux";

const Conversation = () => {
  const messageListRef = useRef(null);

  const { current_messages } = useSelector((state) => state.conv.direct_chat);

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);

  return (
    <Stack sx={{ height: "100dvh", width: "auto",}}>
      <Header />
      <SimpleBarStyle
        scrollableNodeProps={{ ref: messageListRef }}
        style={{ flexGrow: 1, maxHeight: "100%", overflow: "auto" }}
        timeout={500}
        clickOnTrack={false}>
        <Box sx={{ height: "100%", width: "100%", overflow: "hidden" }}>
          <Message menu={true} />
        </Box>
      </SimpleBarStyle>
      <Footer />
    </Stack>
  );
};

export default Conversation;
