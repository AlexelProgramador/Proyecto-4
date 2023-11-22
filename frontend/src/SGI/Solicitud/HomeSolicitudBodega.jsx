import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeSolicitud } from './HandlerSolicitudBodega';
import { useModal } from '../../Components/Modal';
import { PDFViewer } from '@react-pdf/renderer';
import { PrimerPdf } from '../PDFRenderer/PrimerPdf';

export const HomeSolicitudBodega = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { setModal } = useModal()

    const fetchData = async () => {
        try {
            const response = await homeSolicitud();
            setData(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleShow = (id) => {
        navigate(`/show-solicitud/${id}`);
    };

    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='h5 text-uppercase pb-2'>Solicitudes</div>                
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>UUID es de prueba</th>
                                    <th>Nombre Solicitante</th>
                                    <th>Destino Solicitud</th>
                                    <th>Cantidad a Pedir</th>
                                    <th>Estado Solicitud</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item._id}</td>
                                        <td>{item.NombreSolicitanteSolicitud}</td>
                                        <td>{item.NombreBotiquin}</td>
                                        <td>{item.InventarioSolicitud.length}</td>
                                        <td>{item.EstadoSolicitud}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => handleShow(item._id)}><i class="fa-solid fa-eye"></i></button>
                                            <button className='btn btn-danger' onClick={() => { 
                                            setModal(
                                                <div className=''>
                                                    <div className='text-uppercase h6'>Confirmar</div>
                                                    <div className='text-center pt-3'></div>
                                                    <PDFViewer width="1000" height="600">
                                                        <PrimerPdf item={item}/>
                                                    </PDFViewer>
                                                    <div className='text-end'>
                                                        <button className='btn me-2' onClick={() => {setModal(false)}}>Cancelar</button>
                                                    </div>
                                                </div>)}}><i class="fa-solid fa-file-pdf"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSolicitudBodega;
