import "./App.css";
import { Content } from "./Content/Content";
import { Navbar } from "./Navbar/Navbar";
import { Sidebar } from "./SideBar/Sidebar";

function App() {
  return (
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
              <div className="row">
                <Content />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
