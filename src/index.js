import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App";

const root = createRoot(document.getElementById("root")); // Create a root for the app
root.render(
  <StrictMode> 
    <App />
  </StrictMode>
);

// Strictmode is a tool that highlights potential problems in an application.
// It is used to identify components with unsafe lifecycles, legacy API usage, and more. 
// It is recommended to wrap the entire application in a StrictMode component to identify and address potential issues.