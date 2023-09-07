CREATE TABLE Usuario
(
  nombre_usuario VARCHAR(100),
  rut VARCHAR(100),
  contraseña VARCHAR(100),
  correoElectronico VARCHAR(100),
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  idUsuario VARCHAR(100),
  PRIMARY KEY (idUsuario),
  UNIQUE (rut),
  UNIQUE (correoElectronico)
);

CREATE TABLE Usuario_Rol
(
  Rol VARCHAR(100),
  idUsuario VARCHAR(100),
  PRIMARY KEY (idUsuario),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Bodega
(
  idBodega INT,
  nombreBodega VARCHAR(100),
  PRIMARY KEY (idBodega)
);

CREATE TABLE Bodega_Lugar
(
  lugar VARCHAR(100),
  idBodega INT,
  PRIMARY KEY (idBodega),
  FOREIGN KEY (idBodega) REFERENCES Bodega(idBodega)
);


CREATE TABLE Producto
(
  nombreProducto VARCHAR(100),
  idProducto INT,
  marca VARCHAR(100),
  cantidadTotal INT,
  PRIMARY KEY (idProducto)
);

CREATE TABLE Bodega_Producto
(
  cantidad INT,
  fechaVencimiento DATE,
  idBodega INT,
  idUsuario VARCHAR(100),
  idProducto INT,
  FOREIGN KEY (idBodega) REFERENCES Bodega(idBodega),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

CREATE TABLE Etapa_1
(
  idEtapa1 VARCHAR(100),
  fechaRecepcion DATE,
  nroSolicitud INT,
  aprobado INT,
  comentarios VARCHAR(1000),
  idUsuario VARCHAR(100),
  PRIMARY KEY (idEtapa1),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  UNIQUE (nroSolicitud)
);

CREATE TABLE Etapa_2
(
  idEtapa2 VARCHAR(100),
  centroCostos INT,
  aprobado INT,
  comentarios VARCHAR(1000),
  idUsuario VARCHAR(100),
  idEtapa1 VARCHAR(100),
  PRIMARY KEY (idEtapa2),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idEtapa1) REFERENCES Etapa_1(idEtapa1),
  UNIQUE (idEtapa1)
);

CREATE TABLE Etapa_3
(
  idEtapa3 VARCHAR(100),
  aprobacionDEA INT,
  fecha DATE,
  comentarios VARCHAR(1000),
  aprobado INT,
  idUsuario VARCHAR(100),
  idEtapa2 VARCHAR(100),
  PRIMARY KEY (idEtapa3),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idEtapa2) REFERENCES Etapa_2(idEtapa2),
  UNIQUE (idEtapa2)
);

CREATE TABLE Etapa_4
(
  idEtapa4 VARCHAR(100),
  FechaRecepcion DATE,
  tipoCompra VARCHAR(100),
  nroCotizacion INT,
  estado VARCHAR(100),
  comentarios VARCHAR(1000),
  nroOrdenCompra INT,
  fechaOC DATE,
  proveedorSeleccionado VARCHAR(100),
  fechaEntregaProveedor DATE,
  valorCompraIVA INT,
  fechaAutorizacionCompra DATE,
  aprobado INT,
  idUsuario VARCHAR(100),
  idEtapa3 VARCHAR(100),
  PRIMARY KEY (idEtapa4),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idEtapa3) REFERENCES Etapa_3(idEtapa3),
  UNIQUE (idEtapa3)
);

CREATE TABLE Etapa_5
(
  idEtapa5 VARCHAR(100),
  fechaEnvioProveedor DATE,
  comentarios VARCHAR(1000),
  estadoEnvio VARCHAR(100),
  aprobado INT,
  idUsuario VARCHAR(100),
  idEtapa4 VARCHAR(100),
  PRIMARY KEY (idEtapa5),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idEtapa4) REFERENCES Etapa_4(idEtapa4),
  UNIQUE (idEtapa4)
);


CREATE TABLE Etapa_6
(
  idEtapa6 VARCHAR(100),
  fechaEstimadaProveedor DATE,
  estadoCompra VARCHAR(100),
  comentarios VARCHAR(1000),
  aprobado INT,
  idEtapa5 VARCHAR(100),
  idUsuario VARCHAR(100),
  PRIMARY KEY (idEtapa6),
  FOREIGN KEY (idEtapa5) REFERENCES Etapa_5(idEtapa5),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
  UNIQUE (idEtapa5)
);

CREATE TABLE Etapa_7
(
  idEtapa7 VARCHAR(100),
  nroCDP INT,
  estado VARCHAR(100),
  nroFactura INT,
  fechaEmisionFactura DATE,
  fechaMaxima DATE,
  aceptadaSII INT,
  fechaVencimientoFactura DATE,
  montoFactura INT,
  comentarios VARCHAR(1000),
  fechaRecepcion DATE,
  aprobado INT,
  idEtapa6 VARCHAR(100),
  idUsuario VARCHAR(100),
  PRIMARY KEY (idEtapa7),
  FOREIGN KEY (idEtapa6) REFERENCES Etapa_6(idEtapa6),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);