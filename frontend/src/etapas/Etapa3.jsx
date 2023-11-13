import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";

export const Etapa3 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost } = usePostRequest();
  const [solicitudInfo, setSolicitudInfo] = useState(null);

  const [fechaenvaprov, setFechaEnvaProv] = useState("");
  const [estadodeenvio, setEstadodeEnvio] = useState("");
  const [comentarios, setComentarios] = useState("");
  
  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      idEtapa: item._id,
      nroEtapa: 4,
      procesosEtapa3: {
        fechadeenvioproveedor: fechaenvaprov,
        estadodeenvio: estadodeenvio,
        comentarios: comentarios,

      },
    };
    const url = "avanzarEtapa";
    const response = await executePut(url, data);
    navigate("/")
  };

  const getSolicitudInfo = async () => {
    var data = {
      nroSolicitud: item.solicitudInfo.nroSolicitud,
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
          {/* ... Renderizar la información existente ... */}

          <form onSubmit={handleSubmit}>

            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fechaenvaprov}
                onChange={(e) => setFechaEnvaProv(e.target.value)}
              />
              <label htmlFor="floatingSelect">Fecha de envio a proveedor</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={estadodeenvio}
                onChange={(e) => setEstadodeEnvio(e.target.value)}
              />
              <label htmlFor="floatingSelect">Estado de envio</label>
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


            {/* Agrega más campos según sea necesario */}
            
            {/* Botones del formulario */}
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
