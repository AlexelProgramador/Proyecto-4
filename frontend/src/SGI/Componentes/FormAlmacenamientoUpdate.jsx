import React from 'react';
import TablaProductos from './TableProductos';

export const FormAlmacenamientoUpdate = ({almacenamientoData, setAlmacenamientoData, handleUpdate}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlmacenamientoData({ ...almacenamientoData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
  };

  console.log(almacenamientoData.Tipo)

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>
            {almacenamientoData.Tipo === "Botiquín" || "Botiquin" ? "Editar Botiquin" : "Editar Bodega"}
          </div> 
          <form className='row' onSubmit={handleSubmit}>                        
            <div className='col-md-6 pb-4'>
              <div className='form-floating'>
                <input className='form-control'
                  type="text"
                  name="Nombre"
                  value={almacenamientoData.Nombre || ""}
                  onChange={handleInputChange}
                />
                <label>Nombre:</label>
              </div>
            </div>
            <div className='col-md-6 pb-4'>
              <div className='form-floating'>
                <input className='form-control'
                  type="text"
                  name="Lugar"
                  value={almacenamientoData.Lugar || ""}
                  onChange={handleInputChange}
                />
                <label>Lugar:</label>
              </div>
            </div>
            <div className="col-12">        
              <div className='col-12 pb-4'>
                  <button 
                  className='btn btn-primary' 
                  onClick={handleUpdate}>
                  Actualizar {almacenamientoData.Tipo === "Botiquin" ? "Botiqun": "Bodega"}
                  </button>
              </div>
            </div>
              {almacenamientoData.Inventario.length > 0 ? 
              <TablaProductos almacenamientoData={almacenamientoData}/> 
              :<p>No hay Datos de Inventario</p>
              }
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAlmacenamientoUpdate;
