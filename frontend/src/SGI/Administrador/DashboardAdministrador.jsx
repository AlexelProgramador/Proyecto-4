import React, { useState, useEffect } from 'react';
//import { contadorSolicitudPendiente } from '../../Solicitud/HandlerSolicitudBodega';
import { ComponenteDashboardAdministrador } from './ComponenteDashboardAdministrador';
//import { pocasUnidadesProducto, vencimientoProducto } from '../../Producto/HandlerProducto';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const DashboardAdministrador = () => {
    const [dataSolicitudPendiente, setDataSolicitudPendiente] = useState([]);
    const [dataPocasUnidades, setDataPocasUnidades] = useState([]);
    const [dataProductoVencido, setDataProductoVencido] = useState([]);
    const [cargandoDashboard, setCargandoDashboard] = useState(true);
    

    const fetchData = async () => {
        try {
            const urlInventario = '/productos/sinInventario';
            const urlVencimiento = '/productos/venciminetoInventario';
            const urlPendientes = '/solicitudes_bodega/contar';
            const responsePendiente = await fetchDatos(urlPendientes);
            const responsePocoProd = await fetchDatos(urlInventario);
            const data = responsePocoProd.data;
            // const responseVencimientoProducto = await vencimientoProducto();
            setDataSolicitudPendiente(responsePendiente);
            setDataPocasUnidades(data);
            // setDataProductoVencido(responseVencimientoProducto);
            console.log(responsePendiente);
        } catch (error) {
            console.error('Error al obtener datos', error);
        } finally{
            setCargandoDashboard(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {cargandoDashboard ? 
            <div className="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : <ComponenteDashboardAdministrador datosPendiente = {dataSolicitudPendiente} datosPocasUnidades = {dataPocasUnidades}/>}
        </div>
    );
};
export default DashboardAdministrador;
