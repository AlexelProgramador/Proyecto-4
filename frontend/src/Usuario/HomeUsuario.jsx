import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import useDeleteRequest from "../Hooks/useDeleteRequest";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";
import Pagination from "../Components/Pagination";

import React, { useState } from "react";
import Cookies from "js-cookie";

const HomeUsuario = () => {
  const { data, loading, error } = useFetch("usuarios");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const ITEMS_PER_PAGE = 10;
  const { execute } = useDeleteRequest();


  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const navigate = useNavigate();

  // console.log(data)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = data && Array.isArray(data.results)
  ? data.results.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  : [];

  const handleDeleteRequest = async (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        const response = await execute(`usuario/${userId}`, userId);
        console.log(response);
        setShowAlert(true);
        // Aquí puedes realizar alguna lógica adicional después de eliminar el usuario
      } catch (error) {
        console.error(error);
      }
  }
  };

  return (
    <div className="w-75 h-35 mx-auto">
      <div className="mb-3">
        <h2 className="mx-auto display-4">Usuarios</h2>
        <p className="display-7">
          Aquí puedes visualizar los usuarios del sistema y crear nuevos usuarios solicitantes.
        </p>
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-0">
              <div className="h5 text-uppercase">Usuarios</div>
              <button className="btn btn-primary" onClick={() => navigate("/crearUsuario")}>Crear nuevo usuario</button>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center  m-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            ) : (
              <div className="table-responsive mx-auto">
                <table className="table">
                  <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "35%" }} />
                    <col style={{ width: "20%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">Nombre Apellido</th>
                      <th scope="col">Usuario</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Rol</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td>{item.nombre} {item.apellido}</td>
                            <td>{item.usuario}</td>
                            <td>{item.correo}</td>
                            <td>
                              {item.rol
                              .filter((rolItem) => rolItem) // Filtra los elementos no nulos
                              .map((rolItem, index, array) => (
                                <span key={index}>
                                  {rolItem}
                                  {index < array.length - 1 && array[index + 1] !== null && ', '}
                                </span>
                              ))}
                            </td>
                            <td>
                              {/* <button
                                className="btn btn-warning"
                                onClick={() =>
                                  navigate(`/editarUsuario`, {
                                    state: { item },
                                  })
                                }
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleDeleteRequest(item._id)
                                } // Agrega la función para eliminar el usuario
                              >
                                Eliminar
                              </button> */}
                            </td>
                          </tr>
                        );
                      })}
                    
                    {/* // {Array(10 - selectedItems.length) */}
                    {/* //   .fill()
                    //   .map((_, index) => (
                    //     <tr key={`empty-${index}`}>
                    //       <td colSpan="5">&nbsp;</td>
                    //     </tr>
                    //   ))} */}
                  </tbody>
                </table>
                <div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(data.results.length / ITEMS_PER_PAGE)}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showAlert && (
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <CheckCircleFill
            className="bi flex-shrink-0 me-2"
            aria-label="Success:"
          />
          <div>Usuario creada correctamente!</div>
        </div>
      )}
    </div>
  );
};
export default HomeUsuario;
