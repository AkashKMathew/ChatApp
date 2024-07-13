import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Stack } from "@mui/material";

const isAuth = true;  //temp

const DashboardLayout = () => {
  if(!isAuth){
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
