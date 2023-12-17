import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { putReq } from '../../Hooks/usePutRequest';
import { fetchDatos } from '../../Hooks/useFetchRequest';


export const NewAsignacion = ({desgloseProducto, fetchProducto}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDesgloce, setSelectedDesgloce] = useState(null);
  const [dataBodega, setDataBodega] = useState([]);
  const [nuevaAsignacion, setNuevaAsignacion] = useState({
    IdBodega:'',
    TipoAsignacion: 'A Bodega',
    IdProducto: id,
    IdUbicacion: '',
    CantidadAsignada: 0,
    NombreDesgloce: '',
    IdDesgloce: '',
    NombreUbicacion:'',
    FechaProceso: '',
  });
  // console.log(nuevaAsignacion);
  const objetosBuenEstado = desgloseProducto.filter((data) => data.Estado === 'Buen Estado');

  const handleAgregarAsignacion = async () => {
    try {
      const url = `/producto/${id}/asignacion`;
      const data = await putReq(url, nuevaAsignacion);
      if (data.status === 200 || data.statusCode === 200) {
        fetchProducto();
        navigate(`/edit-producto/${id}`);
      }
    } catch (error) {
      console.error('Error al agregar la asignación', error);
    }
    setNuevaAsignacion({
      IdBodega:'',
      TipoAsignacion: 'A Bodega',
      IdUbicacion: '',
      IdProducto: id,
      CantidadAsignada: '',
      NombreDesgloce: '',
      IdDesgloce: '',
      NombreUbicacion:'',
      FechaProceso: '',
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
      const url ='/bodegas';
      const response = await fetchDatos(url);
      setDataBodega(response);
    } catch (error) {
      console.error('Error al obtener datos', error);
    }
  };

  const showAlert = () => {
    alert('La cantidad asignada no puede superar la cantidad total.');
  };

  const handleDesgloceChange = (e) => {
    const selectedUuidDesgloceProducto = e.target.value;
    const selectedDesgloce = desgloseProducto.find((option) => option.UuidProducto === selectedUuidDesgloceProducto);

    if (selectedDesgloce) {
      setSelectedDesgloce(selectedDesgloce); // Almacena el desglose seleccionado en el estado
      setNuevaAsignacion((prevState) => ({
        ...prevState,
        NombreDesgloce: selectedDesgloce.NombreDesgloceProducto,
        IdDesgloce: selectedUuidDesgloceProducto,
      }));
    }
  };

  const handleBodegaChange = (e) => {
    const selectedOIdUbicacionBodega = e.target.value;
    const selectedUbicacion = dataBodega.find(option => option._id === selectedOIdUbicacionBodega);

    if (selectedUbicacion) {
      setNuevaAsignacion(prevState => ({
        ...prevState,
        NombreUbicacion: selectedUbicacion.Nombre,
        IdUbicacion: selectedOIdUbicacionBodega
      }));
    }
  };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div>
            <div className='h6 pb-2 text-uppercase'>Agregar Nueva Asignación a Bodega</div>
            <div className='row'>
                <div className='col-md-6 pb-4'>
                    <div className='form-floating'>
                        <select className='form-select'
                            id="IdDesgloce"
                            name="IdDesgloce"
                            value={nuevaAsignacion.IdDesgloceProducto}
                            onChange={handleDesgloceChange}
                        >
                            <option value="Defecto">
                                Selecciona un Desgloce
                            </option>
                            {objetosBuenEstado.map(option => (
                            <option key={option.UuidProducto} value={option.UuidProducto}>
                                {option.Nombre}
                            </option>
                            ))}
                        </select>
                        <label htmlFor="DesgloceProducto">Desgloce del Producto:</label>
                    </div>
                </div>
                <div className='col-md-6 pb-4'>    
                    <div className='form-floating'>
                        <select className='form-select'
                            id="IdUbicacion"
                            name="IdUbicacion"
                            value={nuevaAsignacion.IdUbicacion}
                            onChange={handleBodegaChange}
                        >
                            <option value="Defecto">
                            Selecciona una bodega
                            </option>
                            {dataBodega.map(option => (
                            <option key={option._id} value={option._id}>
                                {option.Nombre}
                            </option>
                            ))}
                        </select>
                        <label htmlFor="UbicacionProducto">Ubicación del Producto:</label>
                    </div>                
                </div>
                <div className='col-md-6 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="number"
                            id="CantidadAsignada"
                            name="CantidadAsignada"
                            value={nuevaAsignacion.CantidadAsignada}
                            onChange={(e) => {
                              if (e.target.value > selectedDesgloce.CantidadTotal) {
                                showAlert();
                              } else {
                                handleInputChange(e);
                              }
                            }}
                        />
                        <label htmlFor="CantidadAsignada">Cantidad Total:</label>
                    </div> 
                </div>
                <div className='col-md-6 pb-4'>
                    <div className='form-floating'>
                        <input className='form-control'
                            type="date" 
                            id= "FechaProceso"
                            name= "FechaProceso"
                            value={nuevaAsignacion.FechaProceso} 
                            onChange={handleInputChange} />
                        <label>Fecha:</label>
                    </div>                
                </div>
                <div className='col-12 pb-4 text-end'>
                    <button className='btn btn-primary' onClick={handleAgregarAsignacion}>Agregar Asignación</button>
                </div>
            </div>
        </div>
    );
};

export default NewAsignacion;