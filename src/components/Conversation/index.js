import React from "react";
import { Box, Stack } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { SimpleBarStyle } from "../Scrollbar";

const Conversation = () => {
  return (
    <Stack sx={{height:"100vh", width:"auto", overflow:"hidden", }}>
      <Header />
      <SimpleBarStyle
        style={{ flexGrow: 1,maxHeight:"100%", overflow: "auto" }}
        timeout={500}
        clickOnTrack={false}
      >
        <Box sx={{width:"100%"}} >
          <Message menu={true}/>
        </Box>
      </SimpleBarStyle>
      <Footer />
    </Stack>
  );
};

export default Conversation;
