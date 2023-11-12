import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";

export const Content = () => {
  const { data, loading, error } = useFetch("etapas");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const navigate = useNavigate();
  return (
    <>
      <div>
        {loading ? (
          <div className="d-flex justify-content-center  m-5">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">N° Solicitud</th>
                <th scope="col">Etapa</th>
                <th scope="col">Solicitudo por</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.solicitudInfo.nroSolicitud}</td>
                    <td>{item.nroEtapa}</td>
                    <td>
                      {item.infoUsuario.solicitadoPor}
                    </td>
                    <td>{item.etapa}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`etapa${item.nroEtapa}`, { state: { item } })
                        }
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
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
          <div>An example success alert with an icon</div>
        </div>
      )}
    </>
  );
};
