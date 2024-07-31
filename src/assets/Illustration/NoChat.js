import { memo } from "react";
import { Box } from "@mui/material";
import logo from "./earth.png"

// ----------------------------------------------------------------------

function NoChat({ ...other }) {

  return (
    <Box {...other}>
      <img style={{ height: "160px", width: "160px" }} src={logo} alt="logo" />
    </Box>
  );
}

export default memo(NoChat);
