import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateProductoAsignacion } from '../HandlerProducto';
import { homeBodega } from '../../Bodega/HandlerBodega'



export const NewAsignacion = ({desgloseProducto}) => {

    const { id } = useParams();
    const [dataBodega, setDataBodega] = useState([]);
    const [nuevaAsignacion, setNuevaAsignacion] = useState({
        IdBodegaProducto:'',
        TipoProcesoProducto: 'Asignación a Bodega',
        IdProducto: id,
        IdUbicacionProducto: '',
        CantidadAsignadaProducto: 0,
        NombreDesgloceProducto: '',
        IdDesgloceProducto: '',
        NombreUbicacionBodega:'',
        FechaProcesoProducto: '',
    });

    const handleAgregarAsignacion = async () => {
        try {
            await updateProductoAsignacion(id, nuevaAsignacion);

        } catch (error) {
            console.error('Error al agregar la asignación', error);
        }

        // Reiniciar los campos del nuevo desgloce
        setNuevaAsignacion({
            IdBodegaProducto:'',
            TipoProcesoProducto: 'Asignación a Bodega',
            IdUbicacionProducto: '',
            CantidadAsignadaProducto: 0,
            NombreDesgloceProducto: '',
            IdDesgloceProducto: '',
            NombreUbicacionBodega:'',
            FechaProcesoProducto: '',
        });
    };

    const handleInputChange = (e) => {
        setNuevaAsignacion({
          ...nuevaAsignacion,
          [e.target.name]: e.target.value
        });
    };

    const fetchData = async () => {
        try {
            const response = await homeBodega();
            setDataBodega(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };
    const handleDesgloceChange = (e) => {
        const selectedUuidDesgloceProducto = e.target.value;
        const selectedDesgloce = desgloseProducto.find(option => option.UuidProducto === selectedUuidDesgloceProducto);
    
        if (selectedDesgloce) {
            setNuevaAsignacion(prevState => ({
                ...prevState,
                NombreDesgloceProducto: selectedDesgloce.NombreDesgloceProducto,
                IdDesgloceProducto: selectedUuidDesgloceProducto
            }));
        }
    };
    const handleBodegaChange = (e) => {
        const selectedOIdUbicacionBodega = e.target.value;
        const selectedUbicacion = dataBodega.find(option => option._id === selectedOIdUbicacionBodega);
    
        if (selectedUbicacion) {
            setNuevaAsignacion(prevState => ({
                ...prevState,
                NombreUbicacionBodega: selectedUbicacion.NombreBodega,
                IdUbicacionProducto: selectedOIdUbicacionBodega
            }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div>
            <div className='h5 pb-2'>Agregar Nueva Asignación a Bodega</div>
            <div className='row'>
                <div className='col-md-6 pb-4'>
                    <div className='form-floating'>
                        <select className='form-select'
                            id="IdDesgloceProducto"
                            name="IdDesgloceProducto"
                            value={nuevaAsignacion.IdDesgloceProducto}
                            onChange={handleDesgloceChange}
                        >
                            <option value="Defecto">
                                Selecciona un Desgloce
                            </option>
                            {desgloseProducto.map(option => (
                            <option key={option.UuidProducto} value={option.UuidProducto}>
                                {option.NombreDesgloceProducto}
                            </option>
                            ))}
                        </select>
                        <label htmlFor="DesgloceProducto">Desgloce del Producto:</label>
                    </div>
                </div>
                <div className='col-md-6 pb-4'>    
                    <div className='form-floating'>
                        <select className='form-select'
                            id="IdUbicacionProducto"
                            name="IdUbicacionProducto"
                            value={nuevaAsignacion.IdUbicacionProducto}
                            onChange={handleBodegaChange}
                        >
                            <option value="Defecto">
                            Selecciona una bodega
                            </option>
                            {dataBodega.map(option => (
                            <option key={option._id} value={option._id}>
                                {option.NombreBodega}
                            </option>
                            ))}
                        </select>
                        <label htmlFor="UbicacionProducto">Ubicación del Producto:</label>
                    </div>                
                </div>
                <div className='col-md-4 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="text"
                            id="CantidadAsignadaProducto"
                            name="CantidadAsignadaProducto"
                            value={nuevaAsignacion.CantidadAsignadaProducto}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="CantidadAsignadaProducto">Cantidad Total:</label>
                    </div> 
                </div>
                <div className='col-md-4 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="date" 
                            id= "FechaProcesoProducto"
                            name= "FechaProcesoProducto"
                            value={nuevaAsignacion.FechaProcesoProducto} 
                            onChange={handleInputChange} />
                        <label>Fecha:</label>
                    </div>                
                </div>
                <div className='col-md-4 pb-4'>
                    <button className='btn btn-primary' onClick={handleAgregarAsignacion}>Agregar Asignación</button>
                </div>
            </div>
        </div>
    );
};

export default NewAsignacion;