import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateProductoAsignacion } from '../HandlerProducto';
import { homeBodega } from '../../Bodega/HandlerBodega'



export const NewAsignacion = () => {

    const { id } = useParams();
    const [dataBodega, setDataBodega] = useState([]);
    const [nuevaAsignacion, setNuevaAsignacion] = useState({
        IdBodegaProducto: dataBodega.length > 0 ? dataBodega[0]._id : '',
        TipoProcesoProducto: 'Asignación a Bodega',
        UbicacionProducto: dataBodega.length > 0 ? dataBodega[0].NombreBodega : '',
        CantidadAsignadaProducto: 0,
        FechaProcesoProducto: '',
    });

    const handleAgregarAsignacion = async () => {
        try {
            const bodegaSeleccionada = dataBodega.find(bodega => bodega.NombreBodega === nuevaAsignacion.UbicacionProducto);
        if (bodegaSeleccionada) {
            const nuevaAsignacionConId = {
                ...nuevaAsignacion,
                IdBodegaProducto: bodegaSeleccionada._id
            };
            await updateProductoAsignacion(id, nuevaAsignacionConId);
            // console.log(nuevaAsignacionConId);
        } 
        else {
            console.error('No se encontró la bodega seleccionada en la lista de bodegas.');
        }
        } catch (error) {
            console.error('Error al agregar la asignación', error);
            console.log(nuevaAsignacion);
        }

        // Reiniciar los campos del nuevo desgloce
        setNuevaAsignacion({
            IdBodegaProducto: dataBodega.length > 0 ? dataBodega[0]._id : '',
            TipoProcesoProducto: 'Asignación a Bodega',
            UbicacionProducto: dataBodega.length > 0 ? dataBodega[0].NombreBodega : '',
            CantidadAsignadaProducto: 0,
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

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div>
            <h2>Agregar Nueva Asignación a Bodega</h2>      
            <div>
                <label htmlFor="UbicacionProducto">Ubicación del Producto:</label>
                <select
                    id="UbicacionProducto"
                    name="UbicacionProducto"
                    value={nuevaAsignacion.UbicacionProducto}
                    onChange={handleInputChange}
                >
                    {dataBodega.map(option => (
                    <option key={option._id} value={option.NombreBodega}>
                        {option.NombreBodega}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="CantidadAsignadaProducto">Cantidad Total:</label>
                <input
                    type="text"
                    id="CantidadAsignadaProducto"
                    name="CantidadAsignadaProducto"
                    value={nuevaAsignacion.CantidadAsignadaProducto}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Fecha:</label>
                <input 
                    type="date" 
                    id= "FechaProcesoProducto"
                    name= "FechaProcesoProducto"
                    value={nuevaAsignacion.FechaProcesoProducto} 
                    onChange={handleInputChange} />
            </div>
            <button onClick={handleAgregarAsignacion}>Agregar Asignación</button>
        </div>
    );
};

export default NewAsignacion;