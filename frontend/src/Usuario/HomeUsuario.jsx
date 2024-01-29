import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";
import React, { useState } from "react";
import Cookies from "js-cookie";
function getRole(nroEtapa) {
  switch (nroEtapa) {
    case 0:
      return "Secretaria";
    case 1:
      return "Encargado de presupuesto";
    case 2:
      return "Encargado de abastecimiento";
    case 3:
      return "Subdirectora";
    case 4:
      return "Encargado de abastecimiento ";
    case 5:
      return "Bodeguero";
    case "Dea":
      return "Dea";
    default:
      return null;
  }
}
const HomeUsuario = () => {
  const { data, loading, error } = useFetch("usuarios");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);
  const response = JSON.parse(localStorage.getItem("response"));
  const ITEMS_PER_PAGE = 10;
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const navigate = useNavigate();

  console.log(data)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = data && Array.isArray(data.results)
  ? data.results.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  : [];

  return (
    <div className="w-75 h-40 mx-auto">
      <div className="card shadow-card rounded-3 border border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between pb-0">
            <div className="h5 text-uppercase">Usuarios</div>
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
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.nombre}</td>
                          <td>{item.apellido}</td>
                          <td>{item.usuario}</td>
                          {/* <td>{item.results.rol}</td> */}
                          <td>
                            
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
                {[...Array(Math.ceil(data.results.length / ITEMS_PER_PAGE)).keys()].map(
                  (number) => (
                    <button
                      key={number}
                      className="btn btn-primary m-1"
                      onClick={() => setCurrentPage(number + 1)}
                    >
                      {number + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
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
          <div>Solicitud creada correctamente!</div>
        </div>
      )}
    </div>
  );
};
export default HomeUsuario;
