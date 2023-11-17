import React, { useEffect, useState } from "react";
import "./Login.css";
import usePostRequest from "../Hooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { execute, response } = usePostRequest();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const url = "login";
    let response = await execute(data, url);
    Cookies.set("response", JSON.stringify(response));
    if (response.sucess) {
      console.log("Login success");
      navigate("/");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white text-center">
                <h2>Iniciar sesión</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="col">
<label htmlFor="username" className="col-auto col-form-label">
  Usuario
</label>
<input
  type="text"
  id="usernameInput"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="form-control"
/>
</div>

<div className="col">
<label htmlFor="password" className="col-auto col-form-label">
  Contraseña
</label>
<input
  type="password"
  id="passwordInput"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="form-control"
/>
</div>
                  <button className="btn btn-primary mt-3 w-100" type="submit">
                    Confirmar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


