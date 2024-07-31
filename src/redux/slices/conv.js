import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conv: [],
    current_conv: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conv",
  initialState,
  reducers: {
    fetchDirectConv(state, action) {
      const list = action.payload.conv.map((el) => {
        const this_user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );
        return {
          id: el._id,
          user_id: this_user._id,
          name: `${this_user.firstName} ${this_user.lastName}`,
          online: this_user.status === "Online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9.32",
          unread: 0,
          pinned: false,
        };
      });
      state.direct_chat.conv = list;
    },

    updateDirectConv(state, action) {
      const this_conv = action.payload.conv;
      state.direct_chat.conv = state.direct_chat.conv.map((el) => {
        if (el.id !== this_conv._id) {
          return el;
        } else {
          const user = this_conv.participants.find(
            (elm) => elm._id.toString() !== user_id
          );
          return {
            id: this_conv._id,
            user_id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            online: user.status === "Online",
            img: faker.image.avatar(),
            msg: faker.music.songName(),
            time: "2:34",
            unread: 0,
            pinned: false,
          };
        }
      });
    },
    addDirectConv(state, action) {
      const this_conv = action.payload.conv;
      const user = this_conv.participants.find(
        (elm) => elm._id.toString() !== user_id
      );

      state.direct_chat.conv.push({
        id: this_conv._id,
        user_id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        online: user.status === "Online",
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "2:34",
        unread: 0,
        pinned: false,
      });
    },

    setCurrentConv(state, action) {
      state.direct_chat.current_conv = action.payload.conv;
    },

    addCurrentMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.current_message);
    },

    fetchCurrentMessage(state, action) {
      const messages = action.payload.messages;
      if(messages.length === 0) return;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },
  },
});

export default slice.reducer;

export const FetchDirectConv = ({ conv }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConv({ conv }));
  };
};

export const AddDirectConv = ({ conv }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConv({ conv }));
  };
};

export const UpdateDirectConv = ({ conv }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConv({ conv }));
  };
};

export const SetCurrentConv = ({ conv }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConv({ conv }));
  };
};

export const AddCurrentMessage = ({current_message}) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addCurrentMessage( {current_message} ));
  };
};

export const FetchCurrentMessage = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessage({ messages }));
  };
};
