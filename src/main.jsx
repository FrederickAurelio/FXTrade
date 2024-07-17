import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AV from "leancloud-storage/";

AV.init({
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  appKey: import.meta.env.VITE_REACT_APP_APP_KEY,
  serverURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
});

AV.setAdapters({
  storage: window.localStorage,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
