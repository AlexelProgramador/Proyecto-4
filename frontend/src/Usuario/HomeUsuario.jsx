import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import useDeleteRequest from "../Hooks/useDeleteRequest";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";
import React, { useState } from "react";
import Cookies from "js-cookie";

const HomeUsuario = () => {
  const { data, loading, error, fetchData } = useFetch("usuarios");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const ITEMS_PER_PAGE = 10;
  const { execute } = useDeleteRequest();
  const [search, setSearch] = useState("");

  const filteredItems = data && Array.isArray(data.results)
  ? data.results.filter(item => 
    (item.nombre && item.nombre.toLowerCase().includes(search.toLowerCase())) ||
    (item.apellido && item.apellido.toLowerCase().includes(search.toLowerCase())) ||
    (item.usuario && item.usuario.toLowerCase().includes(search.toLowerCase())) ||
    (item.correo && item.correo.toLowerCase().includes(search.toLowerCase())) ||
    item.rol.some(role => typeof role === 'string' && role.toLowerCase().includes(search)) // Búsqueda en roles
    )
  : [];

  // console.log(data)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1); // Restablecer currentPage a 1 cuando se realiza una búsqueda
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const navigate = useNavigate();

  const handleDeleteRequest = async (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        const response = await execute(`usuario/${userId}`, userId);
        console.log(response);
        setShowAlert(true);
        await fetchData(); // Actualiza la lista de usuarios después de eliminar uno
        // Aquí puedes realizar alguna lógica adicional después de eliminar el usuario
      } catch (error) {
        console.error(error);
      }
  }
  };

  return (
    <div className="mx-auto">
      <div className="mb-3">
        <h2 className="mx-auto display-4">Usuarios</h2>
        <p className="display-7">
          Aquí puedes visualizar los usuarios del sistema y crear nuevos usuarios solicitantes.
        </p>
        <SearchBar search={search} setSearch={handleSearchChange} />
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
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
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
                            <div className="btn-group btn-group-sm">

                              <button
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
                              </button>
                              </div>
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
