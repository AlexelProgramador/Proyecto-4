import React, { useState, useContext, useEffect } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import { AlertContext } from "../context/AlertContext";
import { BeatLoader, ClockLoader } from "react-spinners";
import useSubmitForm from "./useSubmitForm";
import { useNavigate } from "react-router-dom";

export const CrearUsuario = () => {
  const { setShowAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState([]);
  const { execute, response } = usePostRequest();
  const productosPorPagina = 3;

  const { handleSubmit, isLoading } = useSubmitForm(execute, setShowAlert);
  console.log("Roles seleccionados:", rol);


  const [loadingText, setLoadingText] = useState("Subiendo solicitud");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev.length >= 21) {
          return "Creando usuario";
        }
        return prev + ".";
      });
    }, 500); // Actualiza cada segundo

    return () => {
      clearInterval(interval); // Limpia el intervalo al desmontar
      setLoadingText("Creando usuario"); // Limpia el texto de carga
    };
  }, []);

  return (
    <div className="w-75 h-40 mx-auto">
      {isLoading ? (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <ClockLoader color="#123abc" loading={isLoading} size={100} />
          <h1 className="mt-5">{loadingText}</h1>
        </div>
      ) : (
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-2">
              <h2 className="mx-auto p-2">Crear Usuario</h2>
            </div>

            <form
              onSubmit={(event) =>
                handleSubmit(
                  event,
                  nombre,
                  apellido,
                  password,
                  rol,
                )
              }
              className="row g-3"
            >
              <div className="col-12">
                <div className="form-floating mt-2 g-2">
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    // required
                  />
                  <label htmlFor="floatingSelect">Nombre:</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mt-2 g-2">
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                  <label htmlFor="floatingSelect">Apellido:</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mt-2 g-2">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingSelect">Password:</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <select
                    className="form-select" id="floatingSelect"
                    value={rol}
                    onChange={(e) => setRol(Array.from(e.target.selectedOptions, option => option.value))}
                    multiple
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Secretaria">Secretaria</option>
                    <option value="Dea">Dea</option>
                  </select>
                  <label htmlFor="rol">Roles:</label>
                  <small className="text-muted">Seleccione uno o más roles</small>
                </div>
                </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/misUsuarios");
                  }}
                >
                  Atras
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
