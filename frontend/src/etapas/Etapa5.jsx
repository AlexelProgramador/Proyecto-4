import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";

export const Etapa5 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost } = usePostRequest();
  const [solicitudInfo, setSolicitudInfo] = useState(null);

  const [ncdp, setNcdp] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [nrofactura, setNrofactura] = useState("");
  const [fechaemifactura, setFechaemifactura] = useState("");
  const [fechamaxima, setFechamaxima] = useState("");
  const [aceptadassi, setAceptadassi] = useState("");
  const [fechavencfact, setFechavencfact] = useState("");
  const [montofactura, setMontofactura] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [fecharecep, setFechaRecep] = useState("");
  const [perscargrecep, setPersCargRecep] = useState("");

  
  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      idEtapa: item._id,
      nroEtapa: 5,
      procesosEtapa4: {
        ncdp: ncdp,
        estado: estado,
        proveedor: proveedor,
        nrofactura: nrofactura,
        fechaemisionfact: fechaemifactura,
        fechamaxima: fechamaxima,
        aceptadoSsi: aceptadassi,
        fechavencfact: fechavencfact,
        montofactura: montofactura
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
                type="text"
                className="form-control"
                value={ncdp}
                onChange={(e) => setNcdp(e.target.value)}
              />
              <label htmlFor="floatingSelect">N° CDP</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
              <label htmlFor="floatingSelect">Estado</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
              />
              <label htmlFor="floatingSelect">Proveedor</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={nrofactura}
                onChange={(e) => setNrofactura(e.target.value)}
              />
              <label htmlFor="floatingSelect">N° Factura</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fechaemifactura}
                onChange={(e) => setFechaemifactura(e.target.value)}
              />
              <label htmlFor="floatingSelect">Fecha emision factura</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fechamaxima}
                onChange={(e) => setFechamaxima(e.target.value)}
              />
              <label htmlFor="floatingSelect">Fecha Maxima</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={aceptadassi}
                onChange={(e) => setAceptadassi(e.target.value)}
              />
              <label htmlFor="floatingSelect">Aceptada SII</label>
            </div>
            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fechavencfact}
                onChange={(e) => setFechavencfact(e.target.value)}
              />
              <label htmlFor="floatingSelect">Fecha vencimiento factura</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={montofactura}
                onChange={(e) => setMontofactura(e.target.value)}
              />
              <label htmlFor="floatingSelect">Monto factura</label>
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

            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fecharecep}
                onChange={(e) => setFechaRecep(e.target.value)}
              />
              <label htmlFor="floatingSelect">Comentario</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={perscargrecep}
                onChange={(e) => setPersCargRecep(e.target.value)}
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
