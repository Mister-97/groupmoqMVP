import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";  // Changed from Router to AppRouter
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />  // Changed from <Router /> to <AppRouter />
  </React.StrictMode>
);
