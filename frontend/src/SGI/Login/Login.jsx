import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import {postRequest} from "../Hooks/usePostRequest";
import logo from "../../img/logo-odontologia-universidad-de-chile.png";
import img from "../../img/facultad-odontologia.jpg";
import { fetchDatos } from "../Hooks/useFetchRequest";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const url = '/login'
    const response = await postRequest(url, data);
    if (response) {
      localStorage.setItem("response", JSON.stringify(response));
      console.log("Login success");
      navigate("/");
    }
  };

  const fetchData = async () => {
    try {
        const url = '/usuarios';
        const response = await fetchDatos(url);
        setDataUser(response);
    } catch (error) {
        console.error('Error al obtener datos', error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(dataUser)

  return (
    <>
      <div>
      <div className="d-flex vh-100 align-items-center justify-content-center">
        {/* Header */}
        <div className="pt-3 px-5 vw-100 row z-2 position-absolute top-0 start-0 d-flex align-items-end">
          <div className="col-md-6 pb-2">
            <img src={logo} alt="logo" style={{ height: '100px' }}/>
          </div>
          <div className="col-md-6 h5 text-uppercase text-end">SISTEMA DE GESTIÓN DE INVENTARIO</div>
        </div>
        {/* Barra color */}
        <div className="vw-100 z-0 position-absolute" style={{ height: '400px', backgroundColor: '#e3e5e5' }}></div>
        {/* Imagen */}
        <div className="z-1 position-absolute top start-10" style={{ height: '450px' }}>
          <img src={img} className="h-100 w-100" alt="imagen" />
        </div>
        <div className="col-md-5 card border-0 position-absolute z-1 top end-10">
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
              <div className="col">
                <label htmlFor="password" className="col-auto col-form-label">
                  Contraseña
                </label>
                <div className="input-group">
                  <div className="input-group-text"><i className="fi fi-sr-lock"></i></div>
                <input
                  type="password"
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
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
