import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePutRequest from "../Hooks/usePutRequest";
import FormUsuario from "./FormUsuario";
import { AlertContext } from "../context/AlertContext";
import { ClockLoader } from "react-spinners";

export const EditarUsuario = () => {
  const { setShowAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ubicación actual
  const { state } = location; // Obtener los datos del estado de la ubicación
  const user = state.item;
  const { isLoading, error, execute: executePut } = usePutRequest();

  const [password, setPassword] = useState([]);
  const [loadingText, setLoadingText] = useState("Actualizando...");

  // console.log("data", user)
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    nombre: user.nombre || "",
    apellido: user.apellido || "",
    usuario: user.usuario || "",
    correo: user.correo || "",
    rol: user.rol || []
  });

  // Función para manejar la actualización del usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      _id: user._id,

      nombre: userData.nombre,
      apellido: userData.apellido,
      usuario: userData.usuario,
      correo: userData.correo,  
      // password: password, // Incluso si la contraseña está vacía, se enviará si se proporciona
      rol: userData.rol,
    };
    // Verificar si se proporciona una nueva contraseña
    if (password.length > 0) {
      data.password = password;
    } 

    const url = `editarUsuario/${user._id}`;
    try {
      const response = await executePut(url, data);
      navigate("/misUsuarios");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      console.log("Validation errors:", error.response.data.errors); // Ver los errores de validación
      setShowAlert({ type: "error", message: "Error al actualizar usuario" });
    }
  };

  const handleInputChange = (fieldName, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="w-75 h-40 mx-auto">
      {isLoading ? (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <ClockLoader color="#123abc" loading={isLoading} size={100} />
          <h1 className="mt-5">{loadingText}</h1>
        </div>
      ) : (
        <div className="mb-3">
        <h2 className="mx-auto display-4">Actualizar Usuario</h2>
        <p className="display-7">
          Aquí puedes actualizar los datos un usuario.
        </p>
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-2">
              <h2 className="h5 text-uppercase">Editar Usuario</h2>
            </div>

        <form onSubmit={handleSubmit} className="row g-3">
          <FormUsuario
            nombre={userData.nombre}
            setNombre={(value) => handleInputChange("nombre", value)}
            apellido={userData.apellido}
            setApellido={(value) => handleInputChange("apellido", value)}
            password={password}
            setPassword={setPassword}
            correo={userData.correo}
            setCorreo={(value) => handleInputChange("correo", value)}
          />
          <div>
            <button type="submit" className="btn btn-primary me-1">
              Guardar cambios
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
        </div>
      )}
    </div>
  );
};
