import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { FetchCurrentMessage, SetCurrentConv } from "../../redux/slices/conv";

const Message = ({ menu }) => {
  const dispatch = useDispatch();
  const { conv, current_messages } = useSelector(
    (state) => state.conv.direct_chat
  );

  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current = conv.find((el) => el?.id === room_id);

    socket.emit("get_messages", { conv_id: current?.id }, (data) => {
      dispatch(FetchCurrentMessage({ messages: data.messages }));
    });

    dispatch(SetCurrentConv({ conv: current }));
  }, []);

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {current_messages.map((el,idx) =>{if(el)
          switch (el.type) {
            case "divider":
              return <Timeline key={idx} el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg key={idx} el={el} menu={menu} />;
                case "doc":
                  return <DocMsg key={idx} el={el} menu={menu} />;
                case "link":
                  return <LinkMsg key={idx} el={el} menu={menu} />;
                case "reply":
                  return <ReplyMsg key={idx} el={el} menu={menu} />;

                default:
                  return <TextMsg key={idx} el={el} menu={menu} />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
