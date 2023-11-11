import React, { useEffect, useState } from "react";
import "./Login.css";
import usePostRequest from "../Hooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { response, error, isLoading, execute } = usePostRequest("login");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    execute({ username, password });
  };
  useEffect(() => {
    if (response) {
      Cookies.set("response", JSON.stringify(response));
      if (response.sucess) {
        console.log("Login success");
        navigate("/");
      }
    }
  }, [response]);
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
