-- Usuario
INSERT INTO Usuario (nombre_usuario, rut, contraseña, correoElectronico, nombre, apellido, idUsuario)
VALUES 
('usuario1', '11111111-1', 'contraseña1', 'usuario1@ejemplo.com', 'Usuario', 'Uno', '1'),
('usuario2', '22222222-2', 'contraseña2', 'usuario2@ejemplo.com', 'Usuario', 'Dos', '2'),
('usuario3', '33333333-3', 'contraseña3', 'usuario3@ejemplo.com', 'Usuario', 'Tres', '3'),
('usuario4', '44444444-4', 'contraseña4', 'usuario4@ejemplo.com', 'Usuario', 'Cuatro', '4'),
('usuario5', '55555555-5', 'contraseña5', 'usuario5@ejemplo.com', 'Usuario', 'Cinco', '5');

-- Bodega
INSERT INTO Bodega (idBodega, nombreBodega)
VALUES 
(1, 'Bodega A'),
(2, 'Bodega B'),
(3, 'Bodega C'),
(4, 'Bodega D'),
(5, 'Bodega E');

-- Producto
INSERT INTO Producto (nombreProducto, idProducto, marca, cantidadTotal)
VALUES 
('Producto 1', 1, 'Marca A', 100),
('Producto 2', 2, 'Marca B', 200),
('Producto 3', 3, 'Marca C', 150),
('Producto 4', 4, 'Marca D', 300),
('Producto 5', 5, 'Marca E', 250);

-- Bodega_Producto
INSERT INTO Bodega_Producto (cantidad, fechaVencimiento, idBodega, idUsuario, idProducto)
VALUES 
(50, '2023-12-31', 1, '1', 1),
(70, '2023-12-31', 1, '2', 2),
(80, '2023-12-31', 2, '3', 3),
(100, '2023-12-31', 2, '4', 4),
(120, '2023-12-31', 3, '5', 5);

-- Usuario_Rol
INSERT INTO Usuario_Rol (Rol, idUsuarioRol, idUsuario)
VALUES 
('Rol1', 1, '1'),
('Rol2', 2, '2'),
('Rol3', 3, '3'),
('Rol4', 4, '4'),
('Rol5', 5, '5');

-- Bodega_Lugar
INSERT INTO Bodega_Lugar (lugar, idBodegaLugar, idBodega)
VALUES 
('Lugar A', 1, 1),
('Lugar B', 2, 1),
('Lugar C', 3, 2),
('Lugar D', 4, 3),
('Lugar E', 5, 4);

-- Solicitud
INSERT INTO Solicitud (idSolicitud, nroSolicitud, solicitudDirectorio)
VALUES 
('SOL1', 1, '/solicitudes/sol1'),
('SOL2', 2, '/solicitudes/sol2'),
('SOL3', 3, '/solicitudes/sol3'),
('SOL4', 4, '/solicitudes/sol4'),
('SOL5', 5, '/solicitudes/sol5');

-- Etapa_1
INSERT INTO Etapa_1 (idEtapa1, fechaRecepcion, aprobado, fechaAprobado, idUsuario, idSolicitud)
VALUES 
('ETAPA1_1', '2023-10-01', 1, '2023-10-05', '1', 'SOL1'),
('ETAPA1_2', '2023-10-02', 1, '2023-10-06', '2', 'SOL2'),
('ETAPA1_3', '2023-10-03', 1, '2023-10-07', '3', 'SOL3'),
('ETAPA1_4', '2023-10-04', 1, '2023-10-08', '4', 'SOL4'),
('ETAPA1_5', '2023-10-05', 1, '2023-10-09', '5', 'SOL5');

-- Etapa_2
INSERT INTO Etapa_2 (idEtapa2, centroCostos, aprobado, fechaAprobado, idUsuario, idEtapa1)
VALUES 
('ETAPA2_1', 1001, 1, '2023-10-10', '1', 'ETAPA1_1'),
('ETAPA2_2', 1002, 1, '2023-10-11', '2', 'ETAPA1_2'),
('ETAPA2_3', 1003, 1, '2023-10-12', '3', 'ETAPA1_3'),
('ETAPA2_4', 1004, 1, '2023-10-13', '4', 'ETAPA1_4'),
('ETAPA2_5', 1005, 1, '2023-10-14', '5', 'ETAPA1_5');

-- Etapa_3
INSERT INTO Etapa_3 (idEtapa3, aprobacionDEA, fecha, aprobado, fechaAprobado, idUsuario, idEtapa2)
VALUES 
('ETAPA3_1', 1, '2023-10-15', 1, '2023-10-20', '1', 'ETAPA2_1'),
('ETAPA3_2', 1, '2023-10-16', 1, '2023-10-21', '2', 'ETAPA2_2'),
('ETAPA3_3', 1, '2023-10-17', 1, '2023-10-22', '3', 'ETAPA2_3'),
('ETAPA3_4', 1, '2023-10-18', 1, '2023-10-23', '4', 'ETAPA2_4'),
('ETAPA3_5', 1, '2023-10-19', 1, '2023-10-24', '5', 'ETAPA2_5');

-- Etapa_4
INSERT INTO Etapa_4 (idEtapa4, FechaRecepcion, tipoCompra, nroCotizacion, estado, nroOrdenCompra, fechaOC, proveedorSeleccionado, fechaEntregaProveedor, valorCompraIVA, fechaAutorizacionCompra, aprobado, fechaAprobado, idUsuario, idEtapa3)
VALUES 
('ETAPA4_1', '2023-10-25', 'Compra1', 101, 'Estado1', 1001, '2023-10-26', 'Proveedor1', '2023-10-27', 10000, '2023-10-28', 1, '2023-10-29', '1', 'ETAPA3_1'),
('ETAPA4_2', '2023-10-26', 'Compra2', 102, 'Estado2', 1002, '2023-10-27', 'Proveedor2', '2023-10-28', 20000, '2023-10-29', 1, '2023-10-30', '2', 'ETAPA3_2'),
('ETAPA4_3', '2023-10-27', 'Compra3', 103, 'Estado3', 1003, '2023-10-28', 'Proveedor3', '2023-10-29', 30000, '2023-10-30', 1, '2023-10-31', '3', 'ETAPA3_3'),
('ETAPA4_4', '2023-10-28', 'Compra4', 104, 'Estado4', 1004, '2023-10-29', 'Proveedor4', '2023-10-30', 40000, '2023-10-31', 1, '2023-11-01', '4', 'ETAPA3_4'),
('ETAPA4_5', '2023-10-29', 'Compra5', 105, 'Estado5', 1005, '2023-10-30', 'Proveedor5', '2023-10-31', 50000, '2023-11-01', 1, '2023-11-02', '5', 'ETAPA3_5');

-- Etapa_5
INSERT INTO Etapa_5 (idEtapa5, fechaEnvioProveedor, estadoEnvio, aprobado, fechaAprobado, idUsuario, idEtapa4)
VALUES 
('ETAPA5_1', '2023-11-02', 'Enviado1', 1, '2023-11-03', '1', 'ETAPA4_1'),
('ETAPA5_2', '2023-11-03', 'Enviado2', 1, '2023-11-04', '2', 'ETAPA4_2'),
('ETAPA5_3', '2023-11-04', 'Enviado3', 1, '2023-11-05', '3', 'ETAPA4_3'),
('ETAPA5_4', '2023-11-05', 'Enviado4', 1, '2023-11-06', '4', 'ETAPA4_4'),
('ETAPA5_5', '2023-11-06', 'Enviado5', 1, '2023-11-07', '5', 'ETAPA4_5');

-- Etapa_6
INSERT INTO Etapa_6 (idEtapa6, fechaEstimadaProveedor, estadoCompra, aprobado, fechaAprobado, idEtapa5, idUsuario)
VALUES 
('ETAPA6_1', '2023-11-10', 'EstadoCompra1', 1, '2023-11-11', 'ETAPA5_1', '1'),
('ETAPA6_2', '2023-11-11', 'EstadoCompra2', 1, '2023-11-12', 'ETAPA5_2', '2'),
('ETAPA6_3', '2023-11-12', 'EstadoCompra3', 1, '2023-11-13', 'ETAPA5_3', '3'),
('ETAPA6_4', '2023-11-13', 'EstadoCompra4', 1, '2023-11-14', 'ETAPA5_4', '4'),
('ETAPA6_5', '2023-11-14', 'EstadoCompra5', 1, '2023-11-15', 'ETAPA5_5', '5');

-- Etapa_7
INSERT INTO Etapa_7 (idEtapa7, nroCDP, estado, nroFactura, fechaEmisionFactura, fechaMaxima, aceptadaSII, fechaVencimientoFactura, montoFactura, fechaRecepcion, aprobado, fechaAprobado, idEtapa6, idUsuario)
VALUES 
('ETAPA7_1', 2001, 'Estado1', 3001, '2023-11-16', '2023-11-17', 1, '2023-11-18', 100000, '2023-11-19', 1, '2023-11-20', 'ETAPA6_1', '1'),
('ETAPA7_2', 2002, 'Estado2', 3002, '2023-11-17', '2023-11-18', 1, '2023-11-19', 200000, '2023-11-20', 1, '2023-11-21', 'ETAPA6_2', '2'),
('ETAPA7_3', 2003, 'Estado3', 3003, '2023-11-18', '2023-11-19', 1, '2023-11-20', 300000, '2023-11-21', 1, '2023-11-22', 'ETAPA6_3', '3'),
('ETAPA7_4', 2004, 'Estado4', 3004, '2023-11-19', '2023-11-20', 1, '2023-11-21', 400000, '2023-11-22', 1, '2023-11-23', 'ETAPA6_4', '4'),
('ETAPA7_5', 2005, 'Estado5', 3005, '2023-11-20', '2023-11-21', 1, '2023-11-22', 500000, '2023-11-23', 1, '2023-11-24', 'ETAPA6_5', '5');

-- Comentario
INSERT INTO Comentario (comentario, fechaComentario, idEtapa1, idEtapa2, idEtapa3, idEtapa4, idEtapa5, idSolicitud)
VALUES 
('Comentario1', '2023-11-01', 'ETAPA1_1', 'ETAPA2_1', 'ETAPA3_1', 'ETAPA4_1', 'ETAPA5_1', 'SOL1'),
('Comentario2', '2023-11-02', 'ETAPA1_2', 'ETAPA2_2', 'ETAPA3_2', 'ETAPA4_2', 'ETAPA5_2', 'SOL2'),
('Comentario3', '2023-11-03', 'ETAPA1_3', 'ETAPA2_3', 'ETAPA3_3', 'ETAPA4_3', 'ETAPA5_3', 'SOL3'),
('Comentario4', '2023-11-04', 'ETAPA1_4', 'ETAPA2_4', 'ETAPA3_4', 'ETAPA4_4', 'ETAPA5_4', 'SOL4'),
('Comentario5', '2023-11-05', 'ETAPA1_5', 'ETAPA2_5', 'ETAPA3_5', 'ETAPA4_5', 'ETAPA5_5', 'SOL5');
