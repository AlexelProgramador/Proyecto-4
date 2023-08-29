from utils.DateFormat import DateFormat


class Etapa():

    def __init__(self,
                 idEtapa,
                 Centro_de_Costos=None,
                 Aprobacion_DEA=None,
                 Fecha_DEA=None,
                 Fecha_de_Recepcion=None,
                 Tipo_de_Compra=None,
                 Nro_Cotizacion=None,
                 Estado=None,
                 Nro_ordenCompra=None,
                 FechaOC=None,
                 Proveedor_Seleccionado=None,
                 FechaEntragaProveedor=None,
                 ValorCompraIVA=None,
                 FechaAutorizacionCompra=None,
                 FechaEnvioProveedor=None,
                 EstadoEnvio=None,
                 FechaEstimadaProveedor=None,
                 EstadoCompra=None,
                 Nro_CDP=None,
                 Nro_Factura=None,
                 FacturaDirectorio=None,
                 FechaEmisionFactura=None,
                 FechaMaxima=None,
                 AceptadaSII=None,
                 FechaVencimientoFactura=None,
                 MontoFactura=None,
                 FechaRecepcion=None,
                 Etapa=None,
                 ) -> None:
        self.Centro_de_Costos = Centro_de_Costos
        self.Aprobacion_DEA = Aprobacion_DEA
        self.Fecha_DEA = Fecha_DEA
        self.Fecha_de_Recepcion = Fecha_de_Recepcion
        self.Tipo_de_Compra = Tipo_de_Compra
        self.Nro_Cotizacion = Nro_Cotizacion
        self.Estado = Estado
        self.Nro_ordenCompra = Nro_ordenCompra
        self.FechaOC = FechaOC
        self.Proveedor_Seleccionado = Proveedor_Seleccionado
        self.FechaEntragaProveedor = FechaEntragaProveedor
        self.ValorCompraIVA = ValorCompraIVA
        self.FechaAutorizacionCompra = FechaAutorizacionCompra
        self.FechaEnvioProveedor = FechaEnvioProveedor
        self.EstadoEnvio = EstadoEnvio
        self.FechaEstimadaProveedor = FechaEstimadaProveedor
        self.EstadoCompra = EstadoCompra
        self.Nro_CDP = Nro_CDP
        self.Nro_Factura = Nro_Factura
        self.FacturaDirectorio = FacturaDirectorio
        self.FechaEmisionFactura = FechaEmisionFactura
        self.FechaMaxima = FechaMaxima
        self.AceptadaSII = AceptadaSII
        self.FechaVencimientoFactura = FechaVencimientoFactura
        self.MontoFactura = MontoFactura
        self.FechaRecepcion = FechaRecepcion
        self.idEtapa = idEtapa
        self.Etapa = Etapa

    def to_JSON(self):
        return {
            'idEtapa': self.idEtapa,
            'Centro_de_Costos': self.Centro_de_Costos,
            'Aprobacion_DEA': self.Aprobacion_DEA,
            'Fecha_DEA': self.Fecha_DEA,
            'Fecha_de_Recepcion': self.Fecha_de_Recepcion,
            'Tipo_de_Compra': self.Tipo_de_Compra,
            'Nro_Cotizacion': self.Nro_Cotizacion,
            'Estado': self.Estado,
            'Nro_ordenCompra': self.Nro_ordenCompra,
            'FechaOC': self.FechaOC,
            'Proveedor_Seleccionado': self.Proveedor_Seleccionado,
            'FechaEntragaProveedor': self.FechaEntragaProveedor,
            'ValorCompraIVA': self.ValorCompraIVA,
            'FechaAutorizacionCompra': self.FechaAutorizacionCompra,
            'FechaEnvioProveedor': self.FechaEnvioProveedor,
            'EstadoEnvio': self.EstadoEnvio,
            'FechaEstimadaProveedor': self.FechaEstimadaProveedor,
            'EstadoCompra': self.EstadoCompra,
            'Nro_CDP': self.Nro_CDP,
            'Nro_Factura': self.Nro_Factura,
            'FacturaDirectorio': self.FacturaDirectorio,
            'FechaEmisionFactura': self.FechaEmisionFactura,
            'FechaMaxima': self.FechaMaxima,
            'AceptadaSII': self.AceptadaSII,
            'FechaVencimientoFactura': self.FechaVencimientoFactura,
            'MontoFactura': self.MontoFactura,
            'FechaRecepcion': self.FechaRecepcion,
            'Etapa': self.Etapa,
            # 'fecha':
        }
