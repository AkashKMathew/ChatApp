import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import {
  FriendComponent,
  FriendRequestComponent,
  UserComponent,
} from "../../components/Friends";

const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.app);
  console.log(users);
  return (
    <>
      {users && users.length ? users.map((el, idx) => {
        return <UserComponent key={el._id} {...el} />;
      }): null}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
  }, [dispatch]);

  const { friends } = useSelector((state) => state.app);
  return (
    <>
      {friends && friends.length ? friends.map((el, idx) => {
        return <FriendComponent key={el._id} {...el} />;
      }): null}
    </>
  );
};

const FriendRequestList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, [dispatch]);

  const { friendRequests } = useSelector((state) => state.app);
  return (
    <>
      {friendRequests && friendRequests.length ? friendRequests.map((el, idx) => {
        return (
          <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />
        );
      }): null}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}>
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0:
                  return <UsersList />;
                case 1:
                  return <FriendsList />;
                case 2:
                  return <FriendRequestList />;
                default:
                  return <UsersList />;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
