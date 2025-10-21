import ReactDOM from "react-dom/client";
import App from "./_app";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
