import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './App.css';
import "./index.css";
import { AuthProvider } from "./Provider/AuthProvider";
ReactDOM.createRoot(document.getElementById("root")).render(

    <AuthProvider>
      <App />
    </AuthProvider>

);