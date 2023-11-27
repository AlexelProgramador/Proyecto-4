import React, { useState, useEffect } from 'react';
import { contadorSolicitudPendiente } from '../../Solicitud/HandlerSolicitudBodega';
import { ComponenteDashboard } from './Componente/ComponenteDashboard';
import { pocasUnidadesProducto, vencimientoProducto } from '../../Producto/HandlerProducto';

export const DashboardBodega = () => {
    const [dataSolicitudPendiente, setDataSolicitudPendiente] = useState([]);
    const [dataPocasUnidades, setDataPocasUnidades] = useState([]);
    const [dataProductoVencido, setDataProductoVencido] = useState([]);
    const [cargandoDashboard, setCargandoDashboard] = useState(true);
    

    const fetchDatos = async () => {
        try {
            const responsePendiente = await contadorSolicitudPendiente();
            const responsePocoProd = await pocasUnidadesProducto();
            const responseVencimientoProducto = await vencimientoProducto();
            setDataSolicitudPendiente(responsePendiente);
            setDataPocasUnidades(responsePocoProd);
            setDataProductoVencido(responseVencimientoProducto);
            console.log(dataProductoVencido);
        } catch (error) {
            console.error('Error al obtener datos', error);
        } finally{
            setCargandoDashboard(false);
        }
    };

    useEffect(() => {
        fetchDatos();
    }, []);
    console.log(dataProductoVencido);
    return (
        <div>
            {cargandoDashboard ? <p> CArgando datos..</p> : <ComponenteDashboard datosPendiente = {dataSolicitudPendiente} datosPocasUnidades = {dataPocasUnidades}/>}
        </div>
    );
};
export default DashboardBodega;
