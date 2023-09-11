import React, { useState, useEffect } from 'react';

interface VerUsuarioDetalleProps {
    idUsuario: string; 
    onClose: () => void; 
}

const VerUsuarioDetalle: React.FC<VerUsuarioDetalleProps> = ({ idUsuario, onClose }) => {
    const [usuario, setUsuario] = useState<UserData | null>(null);

    useEffect(() => {
        // Realiza una solicitud GET al backend para obtener los detalles del usuario
        fetch(`http://127.0.0.1:5000/api/usuarios/${idUsuario}`)
            .then(response => response.json())
            .then((data: UserData) => {
                setUsuario(data);
            })
            .catch(error => {
                console.error('Error al obtener detalles del usuario:', error);
            });
    }, [idUsuario]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {usuario ? (
                    <div>
                        <h2 className='font-bold'>Detalles del Usuario</h2>
                        <p className='text-gray-900'>Nombre de usuario: {usuario.nombre_usuario}</p>
                        <p className='text-gray-900'>RUT: {usuario.rut}</p>
                        <p className='text-gray-900'>Nombre: {usuario.nombre}</p>
                        <p className='text-gray-900'>Apellido: {usuario.apellido}</p>
                        <p className='text-gray-900'>Correo: {usuario.correoElectronico}</p>
                    </div>
                ) : (
                    <p>Cargando detalles del usuario...</p>
                )}
                <div className='text-sm text-right'>
                    <button className='text-xs text-gray-500 hover:text-gray-400 p-2 border border-gray-500 hover:border-gray-400' onClick={onClose}>Atras</button>
                </div>
            </div>
        </div>
    );
};

export default VerUsuarioDetalle;