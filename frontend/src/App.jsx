import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./login/Login";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login login={login} setLogin={setLogin} />}
        />
        {login ? (
          console.log("logged in")
        ) : (
          <Route
            path="/*"
            element={<Login login={login} setLogin={setLogin} />}
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
