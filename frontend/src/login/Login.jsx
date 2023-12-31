import React, { useEffect, useState } from "react";
import "./Login.css";
import usePostRequest from "../hooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = ({ login, setLogin }) => {
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
      setLogin(true);

      // navigate("/");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div className="container-sm start">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
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
          </div>
          <div className="mb-3 row">
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
          </div>
          <button className="btn btn-primary" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </>
  );
};
