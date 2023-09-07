-- Insertar registros en la tabla Usuario
INSERT INTO Usuario (nombre_usuario, rut, contraseña, correoElectronico, nombre, apellido, idUsuario)
VALUES
  ('usuario1', '12345678-9', 'password1', 'usuario1@example.com', 'Nombre1', 'Apellido1', 'user1'),
  ('usuario2', '23456789-0', 'password2', 'usuario2@example.com', 'Nombre2', 'Apellido2', 'user2'),
  ('usuario3', '34567890-1', 'password3', 'usuario3@example.com', 'Nombre3', 'Apellido3', 'user3'),
  ('usuario4', '45678901-2', 'password4', 'usuario4@example.com', 'Nombre4', 'Apellido4', 'user4'),
  ('usuario5', '56789012-3', 'password5', 'usuario5@example.com', 'Nombre5', 'Apellido5', 'user5');

-- Insertar registros en la tabla Usuario_Rol
INSERT INTO Usuario_Rol (Rol, idUsuario)
VALUES
  ('Rol1', 'user1'),
  ('Rol2', 'user2'),
  ('Rol3', 'user3'),
  ('Rol4', 'user4'),
  ('Rol5', 'user5');

-- Insertar registros en la tabla Bodega
INSERT INTO Bodega (idBodega, nombreBodega)
VALUES
  (1, 'Bodega A'),
  (2, 'Bodega B'),
  (3, 'Bodega C'),
  (4, 'Bodega D'),
  (5, 'Bodega E');

-- Insertar registros en la tabla Producto
INSERT INTO Producto (nombreProducto, idProducto, marca, cantidadTotal)
VALUES
  ('Producto1', 1, 'Marca1', 100),
  ('Producto2', 2, 'Marca2', 200),
  ('Producto3', 3, 'Marca3', 150),
  ('Producto4', 4, 'Marca4', 300),
  ('Producto5', 5, 'Marca5', 250);

-- Insertar registros en la tabla Bodega_Producto
INSERT INTO Bodega_Producto (cantidad, fechaVencimiento, idBodega, idUsuario, idProducto)
VALUES
  (50, '2023-09-30', 1, 'user1', 1),
  (75, '2023-08-15', 2, 'user2', 2),
  (60, '2023-07-20', 3, 'user3', 3),
  (100, '2023-10-10', 4, 'user4', 4),
  (80, '2023-09-15', 5, 'user5', 5);

-- Insertar registros en la tabla Etapa_1
INSERT INTO Etapa_1 (idEtapa1, fechaRecepcion, nroSolicitud, aprobado, comentarios, idUsuario)
VALUES
  ('E1-1', '2023-09-01', 1, 1, 'Comentario 1', 'user1'),
  ('E1-2', '2023-09-02', 2, 1, 'Comentario 2', 'user2'),
  ('E1-3', '2023-09-03', 3, 1, 'Comentario 3', 'user3'),
  ('E1-4', '2023-09-04', 4, 1, 'Comentario 4', 'user4'),
  ('E1-5', '2023-09-05', 5, 1, 'Comentario 5', 'user5');
  
-- Insertar registros en la tabla Etapa_2
INSERT INTO Etapa_2 (idEtapa2, centroCostos, aprobado, comentarios, idUsuario, idEtapa1)
VALUES
  ('E2-1', 101, 1, 'Comentario 1', 'user1', 'E1-1'),
  ('E2-2', 102, 1, 'Comentario 2', 'user2', 'E1-2'),
  ('E2-3', 103, 1, 'Comentario 3', 'user3', 'E1-3'),
  ('E2-4', 104, 1, 'Comentario 4', 'user4', 'E1-4'),
  ('E2-5', 105, 1, 'Comentario 5', 'user5', 'E1-5');

-- Insertar registros en la tabla Etapa_3
INSERT INTO Etapa_3 (idEtapa3, aprobacionDEA, fecha, comentarios, aprobado, idUsuario, idEtapa2)
VALUES
  ('E3-1', 1, '2023-09-10', 'Comentario 1', 1, 'user1', 'E2-1'),
  ('E3-2', 1, '2023-09-11', 'Comentario 2', 1, 'user2', 'E2-2'),
  ('E3-3', 1, '2023-09-12', 'Comentario 3', 1, 'user3', 'E2-3'),
  ('E3-4', 1, '2023-09-13', 'Comentario 4', 1, 'user4', 'E2-4'),
  ('E3-5', 1, '2023-09-14', 'Comentario 5', 1, 'user5', 'E2-5');

-- Insertar registros en la tabla Etapa_4
INSERT INTO Etapa_4 (idEtapa4, FechaRecepcion, tipoCompra, nroCotizacion, estado, comentarios, nroOrdenCompra, fechaOC, proveedorSeleccionado, fechaEntregaProveedor, valorCompraIVA, fechaAutorizacionCompra, aprobado, idUsuario, idEtapa3)
VALUES
  ('E4-1', '2023-09-20', 'Tipo 1', 1001, 'Estado 1', 'Comentario 1', 2001, '2023-09-21', 'Proveedor 1', '2023-09-25', 500, '2023-09-22', 1, 'user1', 'E3-1'),
  ('E4-2', '2023-09-21', 'Tipo 2', 1002, 'Estado 2', 'Comentario 2', 2002, '2023-09-22', 'Proveedor 2', '2023-09-26', 600, '2023-09-23', 1, 'user2', 'E3-2'),
  ('E4-3', '2023-09-22', 'Tipo 3', 1003, 'Estado 3', 'Comentario 3', 2003, '2023-09-23', 'Proveedor 3', '2023-09-27', 700, '2023-09-24', 1, 'user3', 'E3-3'),
  ('E4-4', '2023-09-23', 'Tipo 4', 1004, 'Estado 4', 'Comentario 4', 2004, '2023-09-24', 'Proveedor 4', '2023-09-28', 800, '2023-09-25', 1, 'user4', 'E3-4'),
  ('E4-5', '2023-09-24', 'Tipo 5', 1005, 'Estado 5', 'Comentario 5', 2005, '2023-09-25', 'Proveedor 5', '2023-09-29', 900, '2023-09-26', 1, 'user5', 'E3-5');

-- Insertar registros en la tabla Etapa_5
INSERT INTO Etapa_5 (idEtapa5, fechaEnvioProveedor, comentarios, estadoEnvio, aprobado, idUsuario, idEtapa4)
VALUES
  ('E5-1', '2023-09-26', 'Comentario 1', 'Estado Envio 1', 1, 'user1', 'E4-1'),
  ('E5-2', '2023-09-27', 'Comentario 2', 'Estado Envio 2', 1, 'user2', 'E4-2'),
  ('E5-3', '2023-09-28', 'Comentario 3', 'Estado Envio 3', 1, 'user3', 'E4-3'),
  ('E5-4', '2023-09-29', 'Comentario 4', 'Estado Envio 4', 1, 'user4', 'E4-4'),
  ('E5-5', '2023-09-30', 'Comentario 5', 'Estado Envio 5', 1, 'user5', 'E4-5');
  
-- Insertar registros en la tabla Bodega_Lugar
INSERT INTO Bodega_Lugar (lugar, idBodega)
VALUES
  ('Lugar 1', 1),
  ('Lugar 2', 2),
  ('Lugar 3', 3),
  ('Lugar 4', 4),
  ('Lugar 5', 5);

-- Insertar registros en la tabla Etapa_6
INSERT INTO Etapa_6 (idEtapa6, fechaEstimadaProveedor, estadoCompra, comentarios, aprobado, idEtapa5, idUsuario)
VALUES
  ('E6-1', '2023-10-01', 'Estado Compra 1', 'Comentario 1', 1, 'E5-1', 'user1'),
  ('E6-2', '2023-10-02', 'Estado Compra 2', 'Comentario 2', 1, 'E5-2', 'user2'),
  ('E6-3', '2023-10-03', 'Estado Compra 3', 'Comentario 3', 1, 'E5-3', 'user3'),
  ('E6-4', '2023-10-04', 'Estado Compra 4', 'Comentario 4', 1, 'E5-4', 'user4'),
  ('E6-5', '2023-10-05', 'Estado Compra 5', 'Comentario 5', 1, 'E5-5', 'user5');

-- Insertar registros en la tabla Etapa_7
INSERT INTO Etapa_7 (idEtapa7, nroCDP, estado, nroFactura, fechaEmisionFactura, fechaMaxima, aceptadaSII, fechaVencimientoFactura, montoFactura, comentarios, fechaRecepcion, aprobado, idEtapa6, idUsuario)
VALUES
  ('E7-1', 10001, 'Estado 1', 20001, '2023-10-10', '2023-10-20', 1, '2023-10-30', 1000, 'Comentario 1', '2023-10-05', 1, 'E6-1', 'user1'),
  ('E7-2', 10002, 'Estado 2', 20002, '2023-10-11', '2023-10-21', 1, '2023-10-31', 2000, 'Comentario 2', '2023-10-06', 1, 'E6-2', 'user2'),
  ('E7-3', 10003, 'Estado 3', 20003, '2023-10-12', '2023-10-22', 1, '2023-11-01', 3000, 'Comentario 3', '2023-10-07', 1, 'E6-3', 'user3'),
  ('E7-4', 10004, 'Estado 4', 20004, '2023-10-13', '2023-10-23', 1, '2023-11-02', 4000, 'Comentario 4', '2023-10-08', 1, 'E6-4', 'user4'),
  ('E7-5', 10005, 'Estado 5', 20005, '2023-10-14', '2023-10-24', 1, '2023-11-03', 5000, 'Comentario 5', '2023-10-09', 1, 'E6-5', 'user5');
