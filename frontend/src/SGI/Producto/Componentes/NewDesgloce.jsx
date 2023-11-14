import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateProductoDesgloce } from '../HandlerProducto';


export const NewDesgloce = ({ producto }) => {

    const { id } = useParams();
    const [nuevoDesgloce, setNuevoDesgloce] = useState({
        CantidadContenedorProducto: 0,
        CantidadTotal: 0,
        ValorTotal: 0,
        FechaVencimientoProducto: '',
        EstadoProducto: '',
        NombreDesgloceProducto:'',
    });

    const handleAgregarDesgloce = async () => {
        try {
            await updateProductoDesgloce(id, nuevoDesgloce);
            console.log(nuevoDesgloce);
        } catch (error) {
            console.error('Error al actualizar el desgloce', error);
        }

        // Reiniciar los campos del nuevo desgloce
        setNuevoDesgloce({
            CantidadContenedorProducto: 0,
            CantidadTotal: 0,
            ValorTotal: 0,
            FechaVencimientoProducto: '',
            EstadoProducto: '',
            NombreDesgloceProducto:'',
        });
    };

    const handleInputChange = (e) => {
        setNuevoDesgloce({
          ...nuevoDesgloce,
          [e.target.name]: e.target.value
        });
    };
    
    const handleCantidadContenedorChange = (e) => {
        const newValue = e.target.value;
        const cantidadTotal = parseInt(newValue) * producto.CantidadProducto || 0;
        const valorTotal = cantidadTotal * producto.ValorUnitarioProducto || 0;
        setNuevoDesgloce({
          ...nuevoDesgloce,
          CantidadContenedorProducto: newValue,
          CantidadTotal: cantidadTotal,
          ValorTotal: valorTotal,
        });
    };

    return(
        <div>
            <div className='h5 pb-2'>Agregar Nuevo Desgloce de Producto</div>
            <div className='row'>
                <div className='col-12 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="text"
                            id="NombreDesgloceProducto"
                            name="NombreDesgloceProducto"
                            value={nuevoDesgloce.NombreDesgloceProducto}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="NombreDesgloceProducto">Nombre del Desgloce:</label>
                    </div>
                </div>
                <div className='col-md-4 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="text"
                            id="CantidadContenedorProducto"
                            name="CantidadContenedorProducto"
                            value={nuevoDesgloce.CantidadContenedorProducto}
                            onChange={handleCantidadContenedorChange}
                        />
                        <label htmlFor="CantidadContenedorProducto">Cantidad Contenedor Producto:</label>
                    </div>
                </div>
                <div className='col-md-4 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="text"
                            id="CantidadTotal"
                            name="CantidadTotal"
                            value={nuevoDesgloce.CantidadTotal}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="CantidadTotal">Cantidad Total:</label>
                    </div>
                </div>
                <div className='col-md-4 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="text"
                            id="ValorTotal"
                            name="ValorTotal"
                            value={nuevoDesgloce.ValorTotal}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="ValorTotal">Valor Total:</label>
                    </div>
                </div>
                <div className='col-md-4 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="date"
                            id="FechaVencimientoProducto"
                            name="FechaVencimientoProducto"
                            value={nuevoDesgloce.FechaVencimientoProducto}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="FechaVencimientoProducto">Fecha Vencimiento Producto:</label>
                    </div>
                </div>
                <div className='col-md-4 pb-4'>
                    <div className='form-floating'>
                        <select className='form-select'
                            id="EstadoProducto"
                            name="EstadoProducto"
                            value={nuevoDesgloce.EstadoProducto}
                            onChange={handleInputChange}
                        >
                            <option value="Sin información">Sin información</option>
                            <option value="Buen Estado">Buen Estado</option>
                            <option value="Mal Estado">Mal Estado</option>
                        </select>
                        <label htmlFor="EstadoProducto">Estado Producto:</label>
                    </div>
                </div>
                <div className='col-md-4 pb-4'>
                    <button className='btn btn-primary' onClick={handleAgregarDesgloce}>Agregar Desgloce</button>
                </div>                   
            </div> 
        </div>
    );
};

export default NewDesgloce;