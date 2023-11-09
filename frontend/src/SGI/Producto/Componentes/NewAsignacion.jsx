import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateProductoDesgloce } from '../HandlerProducto';


export const NewAsignacion = ({setProducto, producto}) => {

    const { id } = useParams();
    const [nuevoDesgloce, setNuevoDesgloce] = useState({
        CantidadContenedorProducto: 0,
        CantidadTotal: 0,
        ValorTotal: 0,
        FechaVencimientoProducto: '',
        EstadoProducto: '',
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
            <h2>Agregar Nuevo Desgloce de Producto</h2>
                    <div>
                        <label htmlFor="CantidadContenedorProducto">Cantidad Contenedor Producto:</label>
                        <input
                            type="text"
                            id="CantidadContenedorProducto"
                            name="CantidadContenedorProducto"
                            value={nuevoDesgloce.CantidadContenedorProducto}
                            onChange={handleCantidadContenedorChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="CantidadTotal">Cantidad Total:</label>
                        <input
                            type="text"
                            id="CantidadTotal"
                            name="CantidadTotal"
                            value={nuevoDesgloce.CantidadTotal}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ValorTotal">Valor Total:</label>
                        <input
                            type="text"
                            id="ValorTotal"
                            name="ValorTotal"
                            value={nuevoDesgloce.ValorTotal}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="FechaVencimientoProducto">Fecha Vencimiento Producto:</label>
                        <input
                            type="date"
                            id="FechaVencimientoProducto"
                            name="FechaVencimientoProducto"
                            value={nuevoDesgloce.FechaVencimientoProducto}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="EstadoProducto">Estado Producto:</label>
                        <select
                            id="EstadoProducto"
                            name="EstadoProducto"
                            value={nuevoDesgloce.EstadoProducto}
                            onChange={handleInputChange}
                        >
                            <option value="Sin información">Sin información</option>
                            <option value="Buen Estado">Buen Estado</option>
                            <option value="Mal Estado">Mal Estado</option>
                        </select>
                    </div>
                    <button onClick={handleAgregarDesgloce}>Agregar Desgloce</button>
        </div>
    );
};

export default NewAsignacion;