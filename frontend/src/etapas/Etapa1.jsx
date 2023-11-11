import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";

export const Etapa1 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute, response } = usePostRequest();

  const getSolicitudInfo = async () => {
    console.log("entro");
    var data = {
      nroSolicitud: item.solicitudInfo.nroSolicitud,
    };
    var url = "solicitudInfo";
    var response = await execute(data, url);
    console.log(response);
  };
  useEffect(() => {
    getSolicitudInfo();
  }, []);
  return (
    <>
      <h1>{item.solicitudInfo.nroSolicitud}</h1>
      <p>{item._id}</p>
      Centros de Costos
    </>
  );
};
