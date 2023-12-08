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
            //const urlPendientes;
            const responsePendiente = await fetchDatos(urlVencimiento);
            const responsePocoProd = await fetchDatos(urlInventario);
            // const responseVencimientoProducto = await vencimientoProducto();
            // setDataSolicitudPendiente(responsePendiente);
            setDataPocasUnidades(responsePocoProd);
            // setDataProductoVencido(responseVencimientoProducto);
            // console.log(dataProductoVencido);
        } catch (error) {
            console.error('Error al obtener datos', error);
        } finally{
            setCargandoDashboard(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(dataPocasUnidades);
    return (
        <div>
            {cargandoDashboard ? 
            <div class="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : <ComponenteDashboardAdministrador datosPendiente = {dataSolicitudPendiente} datosPocasUnidades = {dataPocasUnidades}/>}
        </div>
    );
};
export default DashboardAdministrador;
