import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { ModalProvider } from '../../Components/Modal';
import {ComponenteDashboardBodega } from '../Almacenamiento/Bodega/Componente/ComponenteDashboardBodega';
import { HomeBodega } from '../Almacenamiento/Bodega/HomeBodega';
import { CreateBodega } from '../Almacenamiento/Bodega/CreateBodega';
import { HomeProducto } from '../Producto/HomeProducto';
import { CreateProducto } from '../Producto/CreateProducto';
import { EditBodega } from '../Almacenamiento/Bodega/EditBodega';
import { EditProducto } from '../Producto/EditProducto';
import { ShowProducto } from '../Producto/ShowProducto';
import { ShowBodega } from '../Almacenamiento/Bodega/ShowBodega';
import { HomeBotiquin } from '../Almacenamiento/Botiquin/HomeBotiquin';
import { CreateBotiquin } from '../Almacenamiento/Botiquin/CreateBotiquin';
import { EditBotiquin } from '../Almacenamiento/Botiquin/EditBotiquin';
import { ShowBotiquin } from '../Almacenamiento/Botiquin/ShowBotiquin'
import { HomeSolicitudBodega } from '../Solicitud/HomeSolicitudBodega';
import { CreateSolicitudBodega } from '../Solicitud/CreateSolicitudBodega';
import { ShowSolicitudBodega } from '../Solicitud/ShowSolicitudBodega';
import { DashboardBodega } from '../Almacenamiento/Bodega/DashboardBodega';
import { PrimerRender } from '../PDFRenderer/PrimerRender';
import { CreateSolicitudBotiquin } from '../SolicitudBotiquin/CreateSolicitudBotiquin';
import { ShowSolicitudBotiquin } from '../SolicitudBotiquin/ShowSolicitudBotiquin';
import { EditDesglose } from '../Producto/Componentes/EditDesglose';

export const Home = () => {
  return(
    <div>
      <nav>
        <NavBar />
      </nav>
      <div>
        <div>
          <SideBar/>
        </div>
      </div>
      <div>
      <ModalProvider>
        <div className='container-fluid pt-4'>
          <Routes>
            <Route path="/dashboard-bodega" element={<ComponenteDashboardBodega />} />
            <Route path="/show-bodega" element ={<HomeBodega/>}/>
            <Route path="/create-bodega" element ={<CreateBodega/>}/>
            <Route path="/edit-bodega/:id" element ={<EditBodega/>}/>
            <Route path="/show-bodega/:id" element ={<ShowBodega/>}/>
            <Route path="/dashboard-bodega" element ={<DashboardBodega/>}/>

            <Route path="/show-producto" element ={<HomeProducto/>}/>
            <Route path="/create-producto" element ={<CreateProducto/>}/>
            <Route path="/edit-producto/:id" element ={<EditProducto/>}/>
            <Route path="/show-producto/:id" element ={<ShowProducto/>}/>
            
            <Route path="/show-botiquin" element ={<HomeBotiquin/>}/>
            <Route path="/create-botiquin" element ={<CreateBotiquin/>}/>
            <Route path="/edit-botiquin/:id" element ={<EditBotiquin/>}/>
            <Route path="/show-botiquin/:id" element ={<ShowBotiquin/>}/>

            <Route path="/edit-producto/:id/desglose/:idDes" element={<EditDesglose />} />

            <Route path="/show-solicitud" element ={<HomeSolicitudBodega/>}/>
            <Route path="/create-solicitud" element ={<CreateSolicitudBodega/>}/>
            <Route path="/show-solicitud/:id" element ={<ShowSolicitudBodega/>}/>

            <Route path="/create-solicitud-botiquin" element ={<CreateSolicitudBotiquin/>}/>
            <Route path="/show-solicitud-botiquin/:id" element ={<ShowSolicitudBotiquin/>}/>

          </Routes>
        </div>
      </ModalProvider>
      </div>
    </div>
  );
};

export default Home;