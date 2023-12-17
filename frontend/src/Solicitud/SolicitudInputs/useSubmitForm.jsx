// useSubmitForm.js
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const useSubmitForm = (execute, setShowAlert) => {
  const navigate = useNavigate();

  const handleSubmit = async (
    event,
    solicitadoPor,
    anexo,
    correo,
    fecha,
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

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        nroEtapa: 0,
        completado: false,
        procesosEtapa1: {},
        procesosEtapa2: {},
        procesosEtapa3: {},
        procesosEtapa4: {},
        procesosEtapa5: {},
        procesosEtapaDea: {},
        infoUsuario: {
          solicitadoPor: solicitadoPor,
          anexo: anexo,
          correo: correo ? correo : "no ingresado",
        },
        infoSolicitud: {
          nroSolicitud: nroSolicitud,
          fecha: fecha,
          tipoSolicitud: "Solicitud Bienes/Servicos",
          idUsuario: sessionInfo.usuarioId,
          productos: productos,
          motivos: motivos,
          fuenteFinanciamiento: fuenteFinanciamiento,
          montoEstimado: montoEstimado,
        },
      })
    );
    archivos.forEach((archivo, index) => {
      formData.append(
        `archivo_${index + 1}`,
        archivo
      );
    });
    const url = "crearEtapa";
    const response = await execute(formData, url);
    if (response) {
      setShowAlert(true);
      navigate("/");
    }
  };

  return handleSubmit;
};

export default useSubmitForm;
