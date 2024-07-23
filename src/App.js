// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { Snackbar } from "@mui/material";
import { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "./redux/slices/app";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const vertical = "bottom";
const horizontal = "center";

function App() {
  const dispatch = useDispatch();
  const {open, message, severity } = useSelector((state) => state.app.snackbar);
  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>

      {open && message ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={3000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(hideSnackbar());
          }}>
          <Alert
            onClose={() => {dispatch(hideSnackbar());}}
            severity={severity}
            sx={{
              width: "100%",
            }}>
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
