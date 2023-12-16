import React from 'react';

export const FormCreateSolicitudBodega = ({botiquinData, bodegaData, selectedItems, handleBodegaChange, handleBotiquinChange, solicitudData, setSolicitudData}) => {
  
  const handleInputChange = (e) => {
    
    setSolicitudData({
      ...solicitudData,
      [e.target.name]: e.target.value
    });
  };

  console.log(selectedItems);

  return (
    <div>
      <div className='row'>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="text"
              // placeholder="Variable Solicitud"
              name="VariableSolicitud"
              value={solicitudData.VariableSolicitud}
              onChange={handleInputChange}
            />
            <label htmlFor="Variable Solicitud">Variable Solicitud:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="text"
              // placeholder="Unidad Solicitud"
              name="UnidadSolicitud"
              value={solicitudData.UnidadSolicitud}
              onChange={handleInputChange}
            />
            <label htmlFor="Unidad Solicitud">Unidad Solicitud:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <select className='form-select'
              name="IdBotiquin"
              value={solicitudData.IdBotiquin}
              onChange={(e) => handleBotiquinChange(e)}
            >
              <option value="">Selecciona un Botiquin</option>
              {botiquinData.map(option => (
              <option key={option._id} value={option._id}>
                {option.Nombre}
              </option>
              ))}
            </select>
            <label htmlFor="BotiquinSolicitud">Botiquin Solicitante:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="text"
              // placeholder="Nombre Solicitante Solicitud"
              name="NombreSolicitanteSolicitud"
              value={solicitudData.NombreSolicitanteSolicitud}
              onChange={handleInputChange}
            />
            <label htmlFor="NombreSolicitanteSolicitud">Nombre del Solicitante:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="date"
              // placeholder="Fecha Solicitud"
              name="FechaSolicitud"
              value={solicitudData.FechaSolicitud}
              onChange={handleInputChange}
            />
            <label htmlFor="FechaSolicitud">Fecha Solicitud:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <select className='form-select'
              name="IdBodega"
              value={solicitudData.IdBodega}
              onChange={handleBodegaChange}
              disabled={selectedItems.length > 0}
            >
              <option value=''>Selecciona una bodega</option>
              {bodegaData.map(option => (
              <option key={option._id} value={option._id}>
                {option.Nombre}
              </option>
              ))}
            </select>
            <label htmlFor="BodegaSolicitud">Bodega a Seleccionar:</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateSolicitudBodega;