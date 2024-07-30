import { memo } from "react";
import { Box } from "@mui/material";
import logo from "./earth.png"

// ----------------------------------------------------------------------

function NoChat({ ...other }) {

  return (
    <Box {...other}>
      <img style={{ height: "360px", width: "360px" }} src={logo} alt="logo" />
    </Box>
  );
}

export default memo(NoChat);
