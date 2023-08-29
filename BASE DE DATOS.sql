CREATE TABLE Usuario
(
  nombre_usuario VARCHAR(255) NOT NULL,
  rut VARCHAR(255) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  Correo_Electronico VARCHAR(255) NOT NULL,
  Nombre_Completo VARCHAR(255) NOT NULL,
  PRIMARY KEY (rut),
  UNIQUE (Nombre_Completo)
);

CREATE TABLE Bodega
(
  idBodega INT NOT NULL,
  Nombre_Bodega VARCHAR(255) NOT NULL,
  PRIMARY KEY (idBodega)
);

CREATE TABLE Solicitud
(
  idSolicitud VARCHAR(255) NOT NULL,
  N°_Solicitud INT NOT NULL,
  Nombre_Solicitante VARCHAR(255) NOT NULL,
  PRIMARY KEY (idSolicitud)
);

CREATE TABLE Detalle_solicitud
(
  BienServicio VARCHAR(255) NOT NULL,
  Cantidad INT NOT NULL,
  Tipo_de_empaque VARCHAR(255) NOT NULL,
  Fecha_solicitud DATE NOT NULL,
  Anexo VARCHAR(255) NOT NULL,
  UnidadProyecto VARCHAR(255) NOT NULL,
  Correo_Electronico VARCHAR(255) NOT NULL,
  Cotizacion INT NOT NULL,
  Fotografia VARCHAR(255) NOT NULL,
  MontoCompra INT NOT NULL,
  idSolicitud VARCHAR(255) NOT NULL,
  FOREIGN KEY (idSolicitud) REFERENCES Solicitud(idSolicitud)
);

CREATE TABLE Producto
(
  Nombre_producto VARCHAR(255) NOT NULL,
  idProducto INT NOT NULL,
  Marca VARCHAR(255) NOT NULL,
  Cantidad_Total INT NOT NULL,
  PRIMARY KEY (idProducto)
);

CREATE TABLE Bodega_Producto
(
  Cantidad INT NOT NULL,
  Fecha_vencimiento INT NOT NULL,
  rut VARCHAR(255) NOT NULL,
  idBodega INT NOT NULL,
  idProducto INT NOT NULL,
  FOREIGN KEY (rut) REFERENCES Usuario(rut),
  FOREIGN KEY (idBodega) REFERENCES Bodega(idBodega),
  FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

CREATE TABLE Etapa
(
  Centro_de_Costos INT NOT NULL,
  Aprobacion_DEA CHAR NOT NULL,
  Fecha_DEA DATE NOT NULL,
  Fecha_de_Recepcion DATE NOT NULL,
  Tipo_de_Compra VARCHAR(255) NOT NULL,
  Nro_Cotizacion INT NOT NULL,
  Estado VARCHAR(255) NOT NULL,
  Nro_ordenCompra INT NOT NULL,
  FechaOC DATE NOT NULL,
  Proveedor_Seleccionado VARCHAR(255) NOT NULL,
  FechaEntragaProveedor DATE NOT NULL,
  ValorCompraIVA INT NOT NULL,
  FechaAutorizacionCompra DATE NOT NULL,
  FechaEnvioProveedor DATE NOT NULL,
  EstadoEnvio VARCHAR(255) NOT NULL,
  FechaEstimadaProveedor DATE NOT NULL,
  EstadoCompra VARCHAR(255) NOT NULL,
  Nro_CDP INT NOT NULL,
  Nro_Factura INT NOT NULL,
  FacturaDirectorio VARCHAR(255) NOT NULL,
  FechaEmisionFactura DATE NOT NULL,
  FechaMaxima DATE NOT NULL,
  AceptadaSII CHAR NOT NULL,
  FechaVencimientoFactura DATE NOT NULL,
  MontoFactura INT NOT NULL,
  FechaRecepcion DATE NOT NULL,
  idEtapa VARCHAR(255) NOT NULL,
  Etapa INT NOT NULL,
  PRIMARY KEY (idEtapa)
);

CREATE TABLE Usuario_Rol
(
  Rol VARCHAR(255) NOT NULL,
  rut VARCHAR(255) NOT NULL,
  FOREIGN KEY (rut) REFERENCES Usuario(rut)
);

CREATE TABLE Bodega_Lugar
(
  Lugar VARCHAR(255) NOT NULL,
  idBodega INT NOT NULL,
  FOREIGN KEY (idBodega) REFERENCES Bodega(idBodega)
);

CREATE TABLE Etapa_Usuario_Solicitud
(
  Comentario VARCHAR(1000) NOT NULL,
  rut VARCHAR(255) NOT NULL,
  idSolicitud VARCHAR(255) NOT NULL,
  idEtapa VARCHAR(255) NOT NULL,
  FOREIGN KEY (rut) REFERENCES Usuario(rut),
  FOREIGN KEY (idSolicitud) REFERENCES Solicitud(idSolicitud),
  FOREIGN KEY (idEtapa) REFERENCES Etapa(idEtapa)
);