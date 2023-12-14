import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import {postRequest} from "../Hooks/usePostRequest";
import logo from "../../img/logo-odontologia.svg";
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
      <div className="">
        {/* Header */}
        <div className="pt-3 row z-2 d-flex align-items-end m-0">
          <div className="col-sm-6 pb-2 px-5">
            <img src={logo} alt="logo" className="logo-login"/>
          </div>
          <div className="col-sm-6 px-5 h5 text-uppercase text-end">SISTEMA DE GESTIÓN DE INVENTARIO</div>
        </div>
        <div className="container-fluid m-0 p-0">
          <div className="d-flex align-items-center justify-content-center" style={{height:'500px'}}>
            {/* Barra color */}
            <div className="col-12 w-100 z-0 position-absolute" style={{ height: '400px', backgroundColor: '#e3e5e5' }}></div>
            {/* Imagen */}
            <div className="z-1 position-absolute top ws-10 u-img w-100">
              {/* <img src={img} className="h-100 w-100" alt="imagen" /> */}
            </div>
            {/* Card Imagen */}
            <div className="col-md-5 card-login rounded-0 border-0 position-absolute z-1 top we-10 p-3">
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
      </div>
      </div>
    </>
  );
};
