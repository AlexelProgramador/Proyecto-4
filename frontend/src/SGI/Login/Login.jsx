import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCuenta } from "./HandlerLogin";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    let response = await loginCuenta(data);

    if (response) {
      localStorage.setItem("response", JSON.stringify(response));
      console.log("Login success");
      navigate("/");
    }
  };

  return (
    <>
      <div className="d-flex vh-100 align-items-center justify-content-center">
        {/* Barra de fondo */}
        <div className="vw-100 z-0 position-absolute" style={{ height: '300px', backgroundColor: '#e3e5e5' }}></div>
        {/* Contenedor del formulario de login */}
        <div className="col-md-6 card position-relative z-1">
          <div className="card-header mx-0 row text-white align-items-center" style={{backgroundColor: '#008dc9', height: '100px'}}>
            <div className="px-5 h5 text-uppercase text-center">Iniciar sesión</div>
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
    </>
  );
};
