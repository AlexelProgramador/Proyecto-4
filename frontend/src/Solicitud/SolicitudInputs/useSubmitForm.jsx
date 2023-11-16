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
    imagen
  ) => {
    event.preventDefault();
    let sessionInfo = JSON.parse(Cookies.get("response"));
    let now = moment().tz("America/Santiago");
    let nroSolicitud = `${now.format("HHmmss")}-SOL-${now.format("DDMMYYYY")}`;

    const data = {
      nroEtapa: 0,
      completado: false,
      procesosEtapa1: {},
      procesosEtapa2: {},
      procesosEtapa3: {},
      procesosEtapa4: {},
      procesosEtapa5: {},
      procesosEtapa6: {},
      procesosEtapa7: {},
      procesosEtapa8: {},
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
        imagen: imagen,
      },
    };
    const url = "crearEtapa";
    const response = await execute(data, url);
    setShowAlert(true);
    navigate("/");
  };

  return handleSubmit;
};

export default useSubmitForm;
