import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormUsuarioUpdate } from '../Componentes/FormUsuarioUpdate';
import { fetchDatos } from '../Hooks/useFetchRequest';
import { putReq } from '../Hooks/usePutRequest';
import Error from '../Maquetado/Error';

export const EditUsuario = () => {
    const [userData, setUserData] = useState({});
    const [cargandoUser, setCargandoUser] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const response = JSON.parse(localStorage.getItem("response"));
    const isAdmin = response && response.usuario && response.usuario.includes("Administrador");

    useEffect(() => {
        fetchUser();
    }, [cargandoUser]);

    const fetchUser = async () => {
        try {
            const url = `/usuario/${id}`;
            const data = await fetchDatos(url);
            setUserData(data.data);
        } catch (error) {
            console.error('Error al obtener la información de la bodega', error);
        } finally{
            setCargandoUser(false);
        }
    };
    

    const handleUpdate = async () => {
      const url = `/usuario/${id}`;
      putReq(url,userData)
      .then(data => {
          if (data.status === 200 || data.statusCode === 200) {
              navigate('/show-usuario');
          }
      })
      .catch(error => {
        // Manejar el error si ocurre
          console.error('Error al actualizar el usuario: ', error);
      });
    };

    return (
        <div>
            {cargandoUser ? (
            <div className="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            )
            : (isAdmin ? ( 
            <FormUsuarioUpdate 
            userData={userData} 
            setUserData={setUserData} 
            handleUpdate={handleUpdate}/>)
            :(<Error/>)
            )}
        </div>
    );
};

export default EditUsuario;
