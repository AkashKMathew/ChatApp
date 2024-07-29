import React, { useRef, useState } from "react";
import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#01f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const ChatInput = ({ setOpenPicker, setValue, value, inputRef }) => {
  const [openActions, setOpenActions] = useState(0);
  return (
    <StyledInput
      inputRef={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                display: openActions ? "inline" : "none",
                position: "relative",
              }}>
              {Actions.map((el) => (
                <Tooltip title={el.title} placement="right">
                  <Fab
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}>
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenActions((prev) => !prev);
                }}>
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setOpenPicker((prev) => !prev);
              }}>
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(0);
  const { current_conv } = useSelector((state) => state.conv.direct_chat);
  const { room_id } = useSelector((state) => state.app);
  const user_id = window.localStorage.getItem("user_id");
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji){
    const input = inputRef.current;
    if(input){
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;
      setValue(
        value.substring(0,selectionStart)+
        emoji +
        value.substring(selectionEnd)
      )
    }
  }
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}>
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <Stack sx={{ width: "100%" }}>
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 81,
              right: 100,
            }}>
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={(emoji)=>{
                handleEmojiClick(emoji.native);
              }}
            />
          </Box>

          <ChatInput
            setOpenPicker={setOpenPicker}
            inputRef={inputRef}
            value={value}
            setValue={setValue}
          />
        </Stack>

        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}>
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}>
            <IconButton
              onClick={() => {
                socket.emit("text_message", {
                  message: linkify(value),
                  conv_id: room_id,
                  from: user_id,
                  to: current_conv.user_id,
                  type: containsUrl(value) ? "Link" : "Text",
                });
                setValue("");
              }}>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
