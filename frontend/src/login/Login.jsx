import React, { useEffect, useState } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../img/logo-odontologia.svg";
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
      <div className="">
        {/* Header */}
        <div className="pt-3 row z-2 d-flex align-items-end m-0">
          <div className="col-sm-6 pb-2 px-5">
            <img src={logo} alt="logo" className="logo-login"/>
          </div>
          <div className="col-md-6 px-5 h5 text-uppercase text-end">Sistema de seguimiento de compras y abastecimiento</div>
        </div>
        <div className="container-fluid m-0 p-0">
          <div className="d-flex align-items-center justify-content-center" style={{height:'500px'}}>
            {/* Barra color */}
            <div className="col-12 w-100 z-0 position-absolute" style={{ height: '400px', backgroundColor: '#e3e5e5' }}></div>
            {/* Imagen */}
            <div className="z-1 position-absolute top ws-10 u-img w-100">
              {/* <img src="https://i.imgur.com/BTF4FN9.jpg" className="h-100 w-100" alt="imagen" /> */}
            </div>
            {/* Card Imagen */}
            <div className="col-md-5 card-login rounded-0 border-0 position-absolute z-1 top we-10 p-3">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="col pb-2">
                    <label htmlFor="username" className="col-auto col-form-label text-uppercase">
                      Usuario
                    </label>
                    <div className="input-group">
                      <div className="input-group-text"><i className="fi fi-sr-user"></i></div>
                      <input
                        type="text"
                        id="usernameInput"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col pb-2">
                    <label htmlFor="password" className="col-auto col-form-label text-uppercase">
                      Contraseña
                    </label>
                    <div className="input-group position-relative">
                      <div className="input-group-text"><i className="fi fi-sr-lock"></i></div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                      <i                  
                        className="bi bi-eye position-absolute end-0 top-50 translate-middle-y"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer', zIndex: 5, paddingRight: '10px'}} // Agregar margen derecho de 10px
                        >  
                        {showPassword ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                        </svg> : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                        </svg>
                        }
                      </i>
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
        </div>
      </div>
    </>
  );
};
