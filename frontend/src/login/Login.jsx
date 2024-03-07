import React, { useEffect, useState } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import logo from "../img/logo-odontologia-universidad-de-chile.png"
// import img from "../img/imgclinic.jpg"

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { execute, response } = usePostRequest();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      usuario: username,
      password: password,
    };
    const url = "login";
    let response = await execute(data, url);

    if (response) {
      localStorage.setItem("response", JSON.stringify(response));
      console.log("Login success");
      navigate("/");
    }
  };
  

   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   }
  

  return (
    <>
      <div>
      <div className="d-flex vh-100 align-items-center justify-content-center">
        {/* Header */}
        <div className="pt-3 px-5 vw-100 row z-2 position-absolute top-0 start-0 d-flex align-items-end">
          <div className="col-md-6 pb-2">
            <img src="https://i.imgur.com/mAXnjql.png" alt="logo" style={{ height: '100px' }}/>
          </div>
          <div className="col-md-6 h5 text-uppercase text-end">Sistema de compras y abastecimiento</div>
        </div>
        {/* Barra color */}
        <div className="vw-100 z-0 position-absolute" style={{ height: '400px', backgroundColor: '#e3e5e5' }}></div>
        {/* Imagen */}
        <div className="z-1 position-absolute top start-10" style={{ height: '450px' , left: '60px' }}>
          <img src="https://i.imgur.com/BTF4FN9.jpg" className="h-100 w-100" alt="imagen" />
        </div>
        <div className="col-md-5 card border-0 position-absolute z-1 top end-10" style={{ right: '230px' }}>
          {/* <div className="card-header mx-0 row text-white align-items-center" style={{backgroundColor: '#1E4162', height: '100px'}}>
            <div className="h5 text-uppercase text-center">SISTEMA DE GESTIÓN DE INVENTARIO</div>
          </div> */}
          <div className="card-body px-4 pb-4">
            <form onSubmit={handleSubmit}>
              <div className="col">
                <label htmlFor="username" className="col-auto col-form-label">
                  Usuario
                </label>
                <div className="input-group">
                  <div class="input-group-text"><i class="fi fi-sr-user"></i></div>
                  <input
                    type="text"
                    id="usernameInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col">
                <label htmlFor="password" className="col-auto col-form-label">
                  Contraseña
                </label>
                <div className="input-group">
                  <div class="input-group-text"><i class="fi fi-sr-lock"></i></div>
                <input

                  type={showPassword ? "text" : "password"}
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                <div class="input-group-pass" >
                <i                  
                  type="button"
                  onClick={togglePasswordVisibility}>  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                  </svg>
                </i>

                </div>
                </div>
              </div>
              <button className="btn btn-primary mt-3 w-100" type="submit">
                INGRESAR
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
