// useSubmitForm.js
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";

import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { uploadFiles } from "../../firebase/config";
import { useState } from "react";
import { BeatLoader } from "react-spinners";


const useSubmitForm = (execute, setShowAlert) => {

  const { data } = useFetch("etapas");

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

// Obtener el número de solicitud del último elemento en el array de datos
const ultimoElemento = data && data.length > 0 ? data[data.length - 1] : null;

    // Sumarle 1 al último número de solicitud para obtener el nuevo número de solicitud
const nuevoNumeroSolicitud = ultimoElemento ? parseInt(ultimoElemento.infoSolicitud.nroSolicitud.split("-")[0]) + 1 : 1;




  const handleSubmit = async (
    event,
    solicitadoPor,
    anexo,
    correo,
    resumen,
    Fechaest,
    productos,
    motivos,
    fuenteFinanciamiento,
    montoEstimado,
    archivos
  ) => {
    event.preventDefault();
    let sessionInfo = JSON.parse(localStorage.getItem("response"));
    let now = moment().tz("America/Santiago");
    const nroSolicitud = `${nuevoNumeroSolicitud}-SOL-${now.format("DDMMYYYY")}`;

    try {
      setIsLoading(true);
      const urlArchivos = await uploadFiles(
        archivos,
        nroSolicitud,
        "solicitud"
      );
      const data = {
        nroEtapa: "0",
        completado: "false",
        procesosEtapa1: { null: null },
        procesosEtapa2: { null: null },

        procesosEtapa3: { null: null },
        procesosEtapaDea: { null: null },
        infoUsuario: {
          solicitadoPor: solicitadoPor,
          anexo: anexo,
          correo: correo ? correo : "no ingresado",
          resumen: resumen,
          fechaestimada: Fechaest
        },
        infoSolicitud: {
          nroSolicitud: nroSolicitud,
          fecha: now,
          tipoSolicitud: "Solicitud Bienes/Servicos",
          idUsuario: sessionInfo.usuarioId,
          productos: productos,
          motivos: motivos,
          fuenteFinanciamiento: fuenteFinanciamiento,
          montoEstimado: montoEstimado,
          urlArchivos: urlArchivos,
        },
      };
      const url = "crearEtapa";
      const response = await execute(data, url);
      setIsLoading(false);
      if (response) {
        setShowAlert(true);
        navigate("/");
        return data.infoSolicitud.nroSolicitud; // Devuelve true si la solicitud se envió correctamente
      } else {
        return null; // Devuelve false si hubo un error al enviar la solicitud
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return { handleSubmit, isLoading };
};

export default useSubmitForm;
