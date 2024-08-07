import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", //CONTACT, STARRED, SHARED
  },
  chat:{
    open: false,
  },
  snackbar: {
    open: false,
    message: null,
    severity: null,
  },
  users: [],
  friends: [],
  friendRequests: [],
  chat_type: null,
  room_id: null,

};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    //toggle chat
    toggleChat(state, action){
      state.chat.open = !state.chat.open;
    },
    //toggle snackbar
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
    closeSnackbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
      state.snackbar.severity = null;
    },

    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests;
    },
    selectConv(state, action){
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    }
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function ToggleChat() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleChat());
  };
}

export function showSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ severity, message }));
    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar({ severity, message }));
    }, 3000);
  };
}

export function hideSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
  };
}

export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(slice.actions.updateUsers({ users: res.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(slice.actions.updateFriends({ friends: res.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriendRequests() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(
          slice.actions.updateFriendRequests({ friendRequests: res.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const SelectConv = ({room_id}) =>{
  return (dispatch, getState) =>{
    dispatch(slice.actions.selectConv({room_id}));
  }
}