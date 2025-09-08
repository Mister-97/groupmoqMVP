import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";              // <-- IMPORTANT: loads Tailwind build

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
