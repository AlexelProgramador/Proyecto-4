import { SolicitudComponent } from "../Solicitud/SolicitudComponent";

export const roles = [
  "Secretaria",
  "Encargado de presupuesto",
  "Director",
  "Encargado de abastecimiento",
  "Subdirectora",
  "Bodeguero",
  "Abogada",
];

export const headTitleTableSolicitud = [
  "N° Solicitud",
  "Estado",
  "Etapa",
  "Acciones",
];

export const routes = [
  {
    path: "/solicitud",
    component: SolicitudComponent,
  },
  // Resto de las rutas
];
