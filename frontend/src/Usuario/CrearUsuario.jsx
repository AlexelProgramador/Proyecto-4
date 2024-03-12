import React, { useState, useContext, useEffect } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import { AlertContext } from "../context/AlertContext";
import { BeatLoader, ClockLoader } from "react-spinners";
import useSubmitForm from "./useSubmitForm";
import { useNavigate } from "react-router-dom";
import FormUsuario from "./FormUsuario";

export const CrearUsuario = () => {
  const { setShowAlert } = useContext(AlertContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const { execute, response } = usePostRequest();

  const { handleSubmit, isLoading } = useSubmitForm(execute, setShowAlert);
  // console.log("Roles seleccionados:", rol);


  const [loadingText, setLoadingText] = useState("Subiendo usuario");

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
    <div className="   mx-auto">
      {isLoading ? (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <ClockLoader color="#123abc" loading={isLoading} size={100} />
          <h1 className="mt-5">{loadingText}</h1>
        </div>
      ) : (
        <div className="mb-3">
        <h2 className="mx-auto display-4">Crear Nuevo Usuario</h2>
        <p className="display-7">
          Aquí puedes crear la cuenta de un usuario solicitante.
        </p>
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-2">
              <h2 className="h5 text-uppercase">Crear Usuario</h2>
            </div>

            <form
              onSubmit={(event) =>
                handleSubmit(
                  event,
                  nombre,
                  apellido,
                  password,
                  correo
                )
              }
              className="row g-3"
            >
              <FormUsuario  
              nombre={nombre}
              setNombre={setNombre}
              apellido={apellido}
              setApellido={setApellido}
              password={password}
              setPassword={setPassword}
              correo={correo}
              setCorreo={setCorreo}
              />
              <div>
                <button type="submit" className="btn btn-primary me-1">
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
                  Atrás
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
