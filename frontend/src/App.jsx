import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./login/Login";
import { Home } from "./home/Home";


// En tu componente App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
