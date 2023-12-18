import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";

export const Etapa4 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost } = usePostRequest();
  const [solicitudInfo, setSolicitudInfo] = useState(null);

  const [fechaestprov, setFechEstProv] = useState("");
  const [estadodecomp, setEstadodeComp] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [archivos, setArchivos] = useState([]);

  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      idEtapa: item._id,
      nroEtapa: 5,
      procesosEtapa4: {
        fechaestiprov: fechaestprov,
        estadodecomp: estadodecomp,
        comentarios: comentarios,
      },
    };
    const url = "avanzarEtapa";
    const response = await executePut(url, data);
    const formData = new FormData();
    formData.append("_id", item._id);
    formData.append("nombreEtapa", "Etapa4");
    formData.append("nroSolicitud", solicitudInfo.solicitudInfo.nroSolicitud);
    archivos.forEach((archivo, index) => {
      formData.append(`archivo_${index + 1}`, archivo);
    });
    const url2 = "subirArchivos";
    const response2 = await executePost(formData, url2);

    navigate("/");  };

  const getSolicitudInfo = async () => {
    var data = {
      _id: item._id,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setSolicitudInfo(response);
  };

  useEffect(() => {
    getSolicitudInfo();
  }, []);

  return (
    <>
      {solicitudInfo ? (
        <>
          <div className="w-75 h-40 mx-auto">
            <div className="card shadow-card rounded-3 border border-0">
              <div className="card-body">
                <h2 className="mx-auto p-2 display-4">Solicitud Etapa 4</h2>
                <p className="display-7">
                  Esta Solicitud corresponde a: Belen Diaz{" "}
                </p>
                <p className="display-7">
                  Porfavor rellenar informacion corresponde a la etapa
                </p>
                <p className="display-7">
                  Una vez lo considere terminado pulsar el boton "Enviar Etapa"
                </p>{" "}
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mt-2 g-2">
                    <input
                      type="date"
                      className="form-control"
                      value={fechaestprov}
                      onChange={(e) => setFechEstProv(e.target.value)}
                    />
                    <label htmlFor="floatingSelect">
                      Fecha estimada proveedor
                    </label>
                  </div>

                  <div className="form-floating mt-2 g-2">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      onChange={(e) => setEstadodeComp(e.target.value)}
                    >
                      <option value="Valor por defecto">
                        Selecciona una opcion
                      </option>
                      <option value="Pendiente de entrega">
                        Pendiente de entrega
                      </option>
                      <option value="Recibida">Recibida</option>
                      <option value="Rechazada">Rechazada</option>
                    </select>
                    <label for="floatingSelect">Estado de compra</label>
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
