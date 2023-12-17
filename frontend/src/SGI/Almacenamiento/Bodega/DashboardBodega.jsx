import React, { useState, useEffect } from 'react';
import { contadorSolicitudPendiente } from '../../Solicitud/HandlerSolicitudBodega';
import { ComponenteDashboardBodega } from './Componente/ComponenteDashboardBodega';
import { fetchDatos } from '../../Hooks/useFetchRequest';

export const DashboardBodega = () => {
    const [dataSolicitudPendiente, setDataSolicitudPendiente] = useState([]);
    const [dataPocasUnidades, setDataPocasUnidades] = useState([]);
    const [dataProductoVencido, setDataProductoVencido] = useState([]);
    const [cargandoDashboard, setCargandoDashboard] = useState(true);
    const response = JSON.parse(localStorage.getItem("response"));
    
    const fetchData = async () => {
        try {
            const idAlm = response.almacenamiento;
            console.log(idAlm);
            const urlInventario = `/bodega/${idAlm}/pocoProducto`;
            const urlVencimiento = `/bodega/${idAlm}/vencimientoInventario`;
            const urlPendientes = `/solicitudes_bodega/contar/${idAlm}`;
            const responsePendiente = await fetchDatos(urlPendientes);
            const responsePocoProd = await fetchDatos(urlInventario);
            const responseVencimiento = await fetchDatos(urlVencimiento);
            const dataProd = responsePocoProd.data;
            const dataVenc = responseVencimiento.data;
            setDataSolicitudPendiente(responsePendiente);
            setDataPocasUnidades(dataProd);
            setDataProductoVencido(dataVenc);
            console.log(dataVenc);
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
            : <ComponenteDashboardBodega datosPendiente = {dataSolicitudPendiente} datosPocasUnidades = {dataPocasUnidades}/>}
        </div>
    );
};
export default DashboardBodega;
