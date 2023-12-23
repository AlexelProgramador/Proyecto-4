// useSubmitForm.js
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { uploadFiles } from "../../firebase/config";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const useSubmitForm = (execute, setShowAlert) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event,
    solicitadoPor,
    anexo,
    correo,
    productos,
    motivos,
    fuenteFinanciamiento,
    montoEstimado,
    archivos
  ) => {
    event.preventDefault();
    let sessionInfo = JSON.parse(localStorage.getItem("response"));
    let now = moment().tz("America/Santiago");
    let nroSolicitud = `${now.format("HHmmss")}-SOL-${now.format("DDMMYYYY")}`;
    try {
      setIsLoading(true);
      // const urlArchivos = await uploadFiles(
      //   archivos,
      //   nroSolicitud,
      //   "solicitud"
      // );
      // const data = {
      //   nroEtapa: "0",
      //   completado: "false",
      //   procesosEtapa1: { null: null },
      //   procesosEtapa2: { null: null },
      //   procesosEtapa3: { null: null },
      //   procesosEtapa4: { null: null },
      //   procesosEtapa5: { null: null },
      //   procesosEtapaDea: { null: null },
      //   infoUsuario: {
      //     solicitadoPor: solicitadoPor,
      //     anexo: anexo,
      //     correo: correo ? correo : "no ingresado",
      //   },
      //   infoSolicitud: {
      //     nroSolicitud: nroSolicitud,
      //     fecha: now,
      //     tipoSolicitud: "Solicitud Bienes/Servicos",
      //     idUsuario: sessionInfo.usuarioId,
      //     productos: productos,
      //     motivos: motivos,
      //     fuenteFinanciamiento: fuenteFinanciamiento,
      //     montoEstimado: montoEstimado,
      //     urlArchivos: urlArchivos,
      //   },
      // };
      // const url = "crearEtapa";
      // const response = await execute(data, url);
      // console.log(response);
      // if (response) {
      //   setShowAlert(true);
      //   navigate("/");
      // }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  return { handleSubmit, isLoading };
};

export default useSubmitForm;
