import React, { useState, useEffect } from 'react';
import { fetchDatos } from '../../Hooks/useFetchRequest';
import { ComponenteDashboardBotiquin } from './Componente/ComponenteDashboardBotiquin';

export const DashboardBotiquin = () => {
    const [dataPocasUnidades, setDataPocasUnidades] = useState([]);
    const [dataProductoVencido, setDataProductoVencido] = useState([]);
    const [cargandoDashboard, setCargandoDashboard] = useState(true);
    const response = JSON.parse(localStorage.getItem("response"));

    const fetchData = async () => {
        try {
            const idAlm = response.almacenamiento;
            console.log(idAlm);
            const urlInventario = `/botiquin/${idAlm}/pocoProducto`;
            const urlVencimiento = `/botiquin/${idAlm}/vencimientoInventario`;

            const responseVencimiento = await fetchDatos(urlVencimiento);
            const responsePocoProd = await fetchDatos(urlInventario);
            setDataProductoVencido(responseVencimiento.data);
            setDataPocasUnidades(responsePocoProd.data);
            console.log(responsePocoProd.data);
        } catch (error) {
            console.error('Error al obtener datos', error);
        } finally{
            setCargandoDashboard(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(dataProductoVencido);
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
            : <ComponenteDashboardBotiquin datosPocasUnidades = {dataPocasUnidades}/>}
        </div>
    );
};
export default DashboardBotiquin;
