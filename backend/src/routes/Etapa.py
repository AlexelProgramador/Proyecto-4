from flask import Blueprint, jsonify, request
import uuid
# Entities
from models.entities.Etapa import Etapa

# Modelos
from models.EtapaModel import EtapaModel
main = Blueprint('etapa_blueprint', __name__)


@main.route('/')
def get_etapas():
    try:
        etapas = EtapaModel.get_etapas()
        if len(etapas) == 0:
            return jsonify({'message': "The database it's empty"}), 200
        else:
            return jsonify(etapas)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@main.route('/add', methods=['POST'])
def add_etapa():
    try:
        idEtapa = uuid.uuid4()
        Centro_de_Costos = request.json['Centro_de_Costos']
        Aprobacion_DEA = request.json['Aprobacion_DEA']
        Fecha_DEA = request.json['Fecha_DEA']
        Fecha_de_Recepcion = request.json['Fecha_de_Recepcion']
        Tipo_de_Compra = request.json['Tipo_de_Compra']
        Nro_Cotizacion = request.json['Nro_Cotizacion']
        Estado = request.json['Estado']
        Nro_ordenCompra = request.json['Nro_ordenCompra']
        FechaOC = request.json['FechaOC']
        Proveedor_Seleccionado = request.json['Proveedor_Seleccionado']
        FechaEntragaProveedor = request.json['FechaEntragaProveedor']
        ValorCompraIVA = request.json['ValorCompraIVA']
        FechaAutorizacionCompra = request.json['FechaAutorizacionCompra']
        FechaEnvioProveedor = request.json['FechaEnvioProveedor']
        EstadoEnvio = request.json['EstadoEnvio']
        FechaEstimadaProveedor = request.json['FechaEstimadaProveedor']
        EstadoCompra = request.json['EstadoCompra']
        Nro_CDP = request.json['Nro_CDP']
        Nro_Factura = request.json['Nro_Factura']
        FacturaDirectorio = request.json['FacturaDirectorio']
        FechaEmisionFactura = request.json['FechaEmisionFactura']
        FechaMaxima = request.json['FechaMaxima']
        AceptadaSII = request.json['AceptadaSII']
        FechaVencimientoFactura = request.json['FechaVencimientoFactura']
        MontoFactura = request.json['MontoFactura']
        FechaRecepcion = request.json['FechaRecepcion']
        Etapa_request = request.json['Etapa']
        etapa = Etapa(
            str(idEtapa),
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
            Etapa_request
        )
        print(idEtapa)
        affected_rows = EtapaModel.add_etapa(etapa)
        if affected_rows == 1:
            return jsonify(etapa.idEtapa)
        else:
            return jsonify({'message': "Error on insert"}), 500
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500

@main.route('/update/<idEtapa>', methods=['PUT'])
def update_usuario(idEtapa):
    try:
        idEtapa = request.json['idEtapa']
        Centro_de_Costos = request.json['Centro_de_Costos']
        Aprobacion_DEA = request.json['Aprobacion_DEA']
        Fecha_DEA = request.json['Fecha_DEA']
        Fecha_de_Recepcion = request.json['Fecha_de_Recepcion']
        Tipo_de_Compra = request.json['Tipo_de_Compra']
        Nro_Cotizacion = request.json['Nro_Cotizacion']
        Estado = request.json['Estado']
        Nro_ordenCompra = request.json['Nro_ordenCompra']
        FechaOC = request.json['FechaOC']
        Proveedor_Seleccionado = request.json['Proveedor_Seleccionado']
        FechaEntragaProveedor = request.json['FechaEntragaProveedor']
        ValorCompraIVA = request.json['ValorCompraIVA']
        FechaAutorizacionCompra = request.json['FechaAutorizacionCompra']
        FechaEnvioProveedor = request.json['FechaEnvioProveedor']
        EstadoEnvio = request.json['EstadoEnvio']
        FechaEstimadaProveedor = request.json['FechaEstimadaProveedor']
        EstadoCompra = request.json['EstadoCompra']
        Nro_CDP = request.json['Nro_CDP']
        Nro_Factura = request.json['Nro_Factura']
        FacturaDirectorio = request.json['FacturaDirectorio']
        FechaEmisionFactura = request.json['FechaEmisionFactura']
        FechaMaxima = request.json['FechaMaxima']
        AceptadaSII = request.json['AceptadaSII']
        FechaVencimientoFactura = request.json['FechaVencimientoFactura']
        MontoFactura = request.json['MontoFactura']
        FechaRecepcion = request.json['FechaRecepcion']
        Etapa_request = request.json['Etapa']
        etapa = Etapa(
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
            Etapa_request
        )
        affected_rows = EtapaModel.update_etapa(etapa)

        if affected_rows == 1:
                return jsonify(etapa.idEtapa)
        else:
                return jsonify({'message': " No usuario updated"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
