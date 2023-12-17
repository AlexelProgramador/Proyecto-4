import React from 'react';
import DataTable from './DataTable';
import ShowSolicitudBotiquin from '../SolicitudBotiquin/ShowSolicitudBotiquin';

export const TableHomeSolicitudBotiquin = ({dataRetiroBotiquin, setModal}) => {
  let columns = [];
  let data = [];

  if (dataRetiroBotiquin.length > 0) {
    columns = [
        { label: 'ID', key: 'uuid' },
        { label: 'Nombre Solicitante', key: 'nombre' },
        { label: 'Origen Retiro', key: 'destino'},
        { label: 'Cantidad Retirada', key: 'cant' },
        { label: 'Acciones', key: 'acciones' }
    ];


    data = dataRetiroBotiquin.map((item) => ({
        uuid: item._id.substring(0, 6),
        nombre: item.NombreSolicitanteSolicitud,
        destino: item.NombreBotiquin,
        cant: item.InventarioSolicitud.length,
        acciones: (
          <div className='btn-group btn-group-sm'>
            <button 
              className='btn btn-primary' 
              onClick={
                () => 
                  setModal(
                    <ShowSolicitudBotiquin
                      setModal={setModal} 
                      retiro={item} 
                      setRetiro={dataRetiroBotiquin}
                      />)}>
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
        )                
      }
    ));
  }

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>

  );
};


export default TableHomeSolicitudBotiquin;
