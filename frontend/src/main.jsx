import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Navbar } from "./Navbar/Navbar";
import { Sidebar } from "./SideBar/Sidebar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <div class="container-x;">
      <div class="row">
        <div class="col sidebar">
          <Sidebar />
        </div>
        <div className="col-11">
          <div className="row">
            <div className="navbar">
              <Navbar />
            </div>
            <App />
          </div>
        </div>
      </div>
    </div>
  </>
);
