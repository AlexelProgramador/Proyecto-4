from database.db import get_connection
from .entities.Etapa import Etapa


class EtapaModel():
    @classmethod
    def get_etapas(self):
        try:
            connection = get_connection()
            etapas = []

            with connection.cursor() as cursor:
                cursor.execute(
                    """
                        SELECT
                        idEtapa,
                        Centro_de_Costos,
                        Aprobacion_DEA,
                        Fecha_DEA,
                        Fecha_de_Recepcion,
                        Tipo_de_Compra,
                        Nro_Cotizacion,
                        Estado,
                        Nro_ordenCompra,
                        FechaOC,
                        Proveedor_Seleccionado,
                        FechaEntragaProveedor,
                        ValorCompraIVA,
                        FechaAutorizacionCompra,
                        FechaEnvioProveedor,
                        EstadoEnvio,
                        FechaEstimadaProveedor,
                        EstadoCompra,
                        Nro_CDP,
                        Nro_Factura,
                        FacturaDirectorio,
                        FechaEmisionFactura,
                        FechaMaxima,
                        AceptadaSII,
                        FechaVencimientoFactura,
                        MontoFactura,
                        FechaRecepcion,
                        Etapa
                        FROM etapa
                    """
                )
                resultset = cursor.fetchall()

                for row in resultset:
                    etapa = Etapa(row[0],
                                  row[1],
                                  row[2],
                                  row[3],
                                  row[4],
                                  row[5],
                                  row[6],
                                  row[7],
                                  row[8],
                                  row[9],
                                  row[10],
                                  row[11],
                                  row[12],
                                  row[13],
                                  row[14],
                                  row[15],
                                  row[16],
                                  row[17],
                                  row[18],
                                  row[19],
                                  row[20],
                                  row[21],
                                  row[22],
                                  row[23],
                                  row[24],
                                  row[25],
                                  row[26],
                                  row[27],
                                  )
                    etapas.append(etapa.to_JSON())
            connection.close()
            return etapas

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def add_etapa(self, etapa):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO etapa 
                        (idEtapa,
                        Centro_de_Costos,
                        Aprobacion_DEA,
                        Fecha_DEA,
                        Fecha_de_Recepcion,
                        Tipo_de_Compra,
                        Nro_Cotizacion,
                        Estado,
                        Nro_ordenCompra,
                        FechaOC,
                        Proveedor_Seleccionado,
                        FechaEntragaProveedor,
                        ValorCompraIVA,
                        FechaAutorizacionCompra,
                        FechaEnvioProveedor,
                        EstadoEnvio,
                        FechaEstimadaProveedor,
                        EstadoCompra,
                        Nro_CDP,
                        Nro_Factura,
                        FacturaDirectorio,
                        FechaEmisionFactura,
                        FechaMaxima,
                        AceptadaSII,
                        FechaVencimientoFactura,
                        MontoFactura,
                        FechaRecepcion,
                        Etapa)
                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                               (
                                   etapa.idEtapa,
                                   etapa.Centro_de_Costos,
                                   etapa.Aprobacion_DEA,
                                   etapa.Fecha_DEA,
                                   etapa.Fecha_de_Recepcion,
                                   etapa.Tipo_de_Compra,
                                   etapa.Nro_Cotizacion,
                                   etapa.Estado,
                                   etapa.Nro_ordenCompra,
                                   etapa.FechaOC,
                                   etapa.Proveedor_Seleccionado,
                                   etapa.FechaEntragaProveedor,
                                   etapa.ValorCompraIVA,
                                   etapa.FechaAutorizacionCompra,
                                   etapa.FechaEnvioProveedor,
                                   etapa.EstadoEnvio,
                                   etapa.FechaEstimadaProveedor,
                                   etapa.EstadoCompra,
                                   etapa.Nro_CDP,
                                   etapa.Nro_Factura,
                                   etapa.FacturaDirectorio,
                                   etapa.FechaEmisionFactura,
                                   etapa.FechaMaxima,
                                   etapa.AceptadaSII,
                                   etapa.FechaVencimientoFactura,
                                   etapa.MontoFactura,
                                   etapa.FechaRecepcion,
                                   etapa.Etapa

                               ))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_etapa(self, etapa):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute("""
                    UPDATE etapa
                    SET
                        Centro_de_Costos = %s,
                        Aprobacion_DEA = %s,
                        Fecha_DEA = %s,
                        Fecha_de_Recepcion = %s,
                        Tipo_de_Compra = %s,
                        Nro_Cotizacion = %s,
                        Estado = %s,
                        Nro_ordenCompra = %s,
                        FechaOC = %s,
                        Proveedor_Seleccionado = %s,
                        FechaEntragaProveedor = %s,
                        ValorCompraIVA = %s,
                        FechaAutorizacionCompra = %s,
                        FechaEnvioProveedor = %s,
                        EstadoEnvio = %s,
                        FechaEstimadaProveedor = %s,
                        EstadoCompra = %s,
                        Nro_CDP = %s,
                        Nro_Factura = %s,
                        FacturaDirectorio = %s,
                        FechaEmisionFactura = %s,
                        FechaMaxima = %s,
                        AceptadaSII = %s,
                        FechaVencimientoFactura = %s,
                        MontoFactura = %s,
                        FechaRecepcion = %s,
                        Etapa = %s
                    WHERE idEtapa = %s
                """, (
                    etapa.Centro_de_Costos,
                    etapa.Aprobacion_DEA,
                    etapa.Fecha_DEA,
                    etapa.Fecha_de_Recepcion,
                    etapa.Tipo_de_Compra,
                    etapa.Nro_Cotizacion,
                    etapa.Estado,
                    etapa.Nro_ordenCompra,
                    etapa.FechaOC,
                    etapa.Proveedor_Seleccionado,
                    etapa.FechaEntragaProveedor,
                    etapa.ValorCompraIVA,
                    etapa.FechaAutorizacionCompra,
                    etapa.FechaEnvioProveedor,
                    etapa.EstadoEnvio,
                    etapa.FechaEstimadaProveedor,
                    etapa.EstadoCompra,
                    etapa.Nro_CDP,
                    etapa.Nro_Factura,
                    etapa.FacturaDirectorio,
                    etapa.FechaEmisionFactura,
                    etapa.FechaMaxima,
                    etapa.AceptadaSII,
                    etapa.FechaVencimientoFactura,
                    etapa.MontoFactura,
                    etapa.FechaRecepcion,
                    etapa.Etapa,
                    etapa.idEtapa
                ))
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows

        except Exception as ex:
            raise Exception(ex)
