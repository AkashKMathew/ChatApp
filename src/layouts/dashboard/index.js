import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";


const DashboardLayout = () => {
  const {isLoggedIn} = useSelector((state) => state.auth);

  if(!isLoggedIn){
    return <Navigate to="/auth/login"/>
  }
  
  return (
    <>
      <Stack direction={"row"}>
        <Sidebar/>
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
