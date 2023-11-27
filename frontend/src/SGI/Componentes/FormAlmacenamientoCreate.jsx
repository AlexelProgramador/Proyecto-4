import React from 'react';

export const FormAlmacenamientoCreate = ({almacenamientoData, setAlmacenamientoData, handleInsert}) => {
  const handleInputChange = (e) => {
    setAlmacenamientoData({
      ...almacenamientoData,
      [e.target.name]: e.target.value
    });
  };
  console.log(almacenamientoData);
  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>{almacenamientoData.Tipo === "Botiquin" ? "Nuevo Botiquin": "Nueva Bodega"}</div>
          <form className='row'>
              <div className='col-md-6 pb-4'>
                <div className='form-floating'>
                  <input className='form-control'
                    type="text"
                    name="Nombre"
                    value={almacenamientoData.Nombre}
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
                    value={almacenamientoData.Lugar}
                    onChange={handleInputChange}
                  />
                  <label>Lugar:</label>
                </div>
              </div>
              <div class="col-12">        
                <button className='btn btn-primary' type="button" onClick={handleInsert}>
                  Insertar Datos de {almacenamientoData.Tipo}
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAlmacenamientoCreate;
