import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "../firebase/config";

export const Etapa3 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost } = usePostRequest();
  const [infoSolicitud, setinfoSolicitud] = useState(null);

  const [fechaenvaprov, setFechaEnvaProv] = useState("");
  const [estadodeenvio, setEstadodeEnvio] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [archivos, setArchivos] = useState([]);

  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlArchivos = await uploadFiles(
        archivos,
        item.infoSolicitud.nroSolicitud,
        infoSolicitud.nroEtapa
      );

      const data = {
        idEtapa: item._id,
        nroEtapa: 4,
        procesosEtapa3: {
          fechadeenvioproveedor: fechaenvaprov,
          estadodeenvio: estadodeenvio,
          comentarios: comentarios,
          urlArchivos: urlArchivos,
        },
      };
      const url = "avanzarEtapa";
      const response = await executePut(url, data);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const getinfoSolicitud = async () => {
    var data = {
      _id: item._id,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setinfoSolicitud(response);
  };

  useEffect(() => {
    getinfoSolicitud();
  }, []);

  return (
    <>
      {infoSolicitud ? (
        <>
          <div className="w-75 h-40 mx-auto">
            <div className="card shadow-card rounded-3 border border-0">
              <div className="card-body">
                <h2 className="mx-auto p-2 display-4">Solicitud Etapa 3</h2>
                <p className="display-7">
                  Esta Solicitud corresponde a: Claudia Caruz{" "}
                </p>
                <p className="display-7">
                  Porfavor rellenar informacion corresponde a la etapa
                </p>
                <p className="display-7">
                  Una vez lo considere terminado pulsar el boton "Enviar Etapa"
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mt-2 g-2">
                    <input
                      type="date"
                      className="form-control"
                      value={fechaenvaprov}
                      onChange={(e) => setFechaEnvaProv(e.target.value)}
                    />
                    <label htmlFor="floatingSelect">
                      Fecha de envio a proveedor
                    </label>
                  </div>

                  <div className="form-floating mt-2 g-2">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      onChange={(e) => setEstadodeEnvio(e.target.value)}
                    >
                      <option value="Valor por defecto">
                        Seleccione una opcion
                      </option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                    <label for="floatingSelect">Estado de Envio</label>
                  </div>

                  <div className="form-floating mt-2 g-2">
                    <input
                      type="text"
                      className="form-control"
                      value={comentarios}
                      onChange={(e) => setComentarios(e.target.value)}
                    />
                    <label htmlFor="floatingSelect">Comentario</label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="montoEstimado" className="form-label">
                      Adjuntar pdf(s) en caso de necesitarlo:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="archivo"
                      accept="application/pdf"
                      multiple
                      onChange={(e) => {
                        setArchivos(Array.from(e.target.files));
                      }}
                    />
                  </div>
                  <button className="m-2 btn btn-primary" type="submit">
                    Aceptar
                  </button>
                  <button
                    className="m-2  btn btn-danger"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Atrás
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
