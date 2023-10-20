import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const MyComponent = () => {
    const [data, setData] = useState([]);
    const url_test = "http://127.0.0.1:8000/api"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url_test + "/bodegas");
                setData(response.data);
            } catch (error) {
                // Manejo de errores
                console.error('Error al obtener datos', error);
            }
            //console.log(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            
            {data.map((item) => (
                <div key={item.id}>
                    <p>{item.NombreBodega}</p>
                    {/* aquí hay una lista */}
                    <p>{item.InventarioBodega[0].CantidadInventario}</p>
                    {/* Otros datos que quieras mostrar */}
                </div>
            ))}
        </div>
    );
};

export default MyComponent;