import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";  // Changed to match export name
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />  // Changed to match export name
  </React.StrictMode>
);
