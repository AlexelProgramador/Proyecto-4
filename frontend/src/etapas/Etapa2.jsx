import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";

export const Etapa2 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost } = usePostRequest();
  const [solicitudInfo, setSolicitudInfo] = useState(null);
  

  const [tipoCompra, setTipoCompra] = useState("");
  const [nrocotizacion, setNroCotizacion] = useState("");
  const [estado, setEstado] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [nroordencompra, setNroOrdenCompra] = useState("");
  const [fechaoc, setFechaoc] = useState("");
  const [proveedorselecc, setProvSelec] = useState("");
  const [fechaentregaprov, setFechaEntProv] = useState("");
  const [valorcompra, setValorCompra] = useState("");
  const [fechaautocompra, setFechaautocompra] = useState("");



  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      idEtapa: item._id,
      nroEtapa: 3,
      procesosEtapa2: {
        tipodecompra: tipoCompra,
        numerocotizacion: nrocotizacion,
        estado: estado,
        comentarios: comentarios,
        nroordendecompra: nroordencompra,
        fechadeoc: fechaoc,
        proveedorseleccionado: proveedorselecc,
        fechaentregaproveedor: fechaentregaprov,
        valordecompramiva: valorcompra,
        fechaautocompra: fechaautocompra
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
    <div style={{ position: 'relative', height: '135vh', width: '90%' }} >
      <div className='card shadow-card rounded-0 border border-0'style={{ position: 'absolute', right: '10px', bottom: '190px', width: '1050px' }} >
        <div className='card-body'>
          <h2 className='mx-auto p-2'>Solicitud Etapa 2</h2>

          <form onSubmit={handleSubmit}>
            {/* Nuevos campos para la vista 2 */}
            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={tipoCompra}
                onChange={(e) => setTipoCompra(e.target.value)}
              />
              <label htmlFor="floatingSelect">Tipo de compra</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={nrocotizacion}
                onChange={(e) => setNroCotizacion(e.target.value)}
              />
              <label htmlFor="floatingSelect">Numero de cotizacion</label>
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
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              />
              <label htmlFor="floatingSelect">Comentario</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={nroordencompra}
                onChange={(e) => setNroOrdenCompra(e.target.value)}
              />
              <label htmlFor="floatingSelect">Numero de orden de compra</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fechaoc}
                onChange={(e) => setFechaoc(e.target.value)}
              />
              <label htmlFor="floatingSelect">Fecha de orden de compra</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={proveedorselecc}
                onChange={(e) => setProvSelec(e.target.value)}
              />
              <label htmlFor="floatingSelect">Proveedor seleccionado</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fechaentregaprov}
                onChange={(e) => setFechaEntProv(e.target.value)}
              />
              <label htmlFor="floatingSelect">Fecha entrega proveedor</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="text"
                className="form-control"
                value={valorcompra}
                onChange={(e) => setValorCompra(e.target.value)}
              />
              <label htmlFor="floatingSelect">Valor de compra mas iva</label>
            </div>

            <div className="form-floating mt-2 g-2">
              <input
                type="date"
                className="form-control"
                value={fechaautocompra}
                onChange={(e) => setFechaautocompra(e.target.value)}
              />
              <label htmlFor="floatingSelect">Fecha de autorizacion de compra </label>
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
