import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { ModalProvider } from '../Componentes/Modal';
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
// import { PrimerRender } from '../PDFRenderer/PrimerRender';
import { CreateSolicitudBotiquin } from '../SolicitudBotiquin/CreateSolicitudBotiquin';
import { ShowSolicitudBotiquin } from '../SolicitudBotiquin/ShowSolicitudBotiquin';
import { EditDesglose } from '../Producto/Componentes/EditDesglose';
import { DashboardHome } from '../Dashboard/Dashboard';
import Error from './Error';

export const Home = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("response"));
    if (!response) {
      navigate("/login");
    }
  }, []);

  return(
    <>
      <div>
        <main className={show ? 'space-toggle' : null}>
          <NavBar show={show} setShow={setShow} />
          <SideBar show={show} setShow={setShow}/>
          
      <ModalProvider>
        <div className='container-fluid pt-4'>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/show-bodega" element ={<HomeBodega/>}/>
            {/* <Route path="/create-bodega" element ={<CreateBodega/>}/> */}
            <Route path="/edit-bodega/:id" element ={<EditBodega/>}/>
            <Route path="/show-bodega/:id" element ={<ShowBodega/>}/>
            <Route path="/dashboard-bodega" element ={<DashboardBodega/>}/>

            <Route path="/show-producto" element ={<HomeProducto/>}/>
            {/* <Route path="/create-producto" element ={<CreateProducto/>}/> */}
            <Route path="/edit-producto/:id" element ={<EditProducto/>}/>
            <Route path="/show-producto/:id" element ={<ShowProducto/>}/>
            
            <Route path="/show-botiquin" element ={<HomeBotiquin/>}/>
            {/* <Route path="/create-botiquin" element ={<CreateBotiquin/>}/> */}
            <Route path="/edit-botiquin/:id" element ={<EditBotiquin/>}/>
            <Route path="/show-botiquin/:id" element ={<ShowBotiquin/>}/>

            <Route path="/edit-producto/:id/desglose/:idDes" element={<EditDesglose />} />

            <Route path="/show-solicitud" element ={<HomeSolicitudBodega/>}/>
            <Route path="/create-solicitud" element ={<CreateSolicitudBodega/>}/>
            {/* <Route path="/show-solicitud/:id" element ={<ShowSolicitudBodega/>}/> */}

            <Route path="/create-solicitud-botiquin" element ={<CreateSolicitudBotiquin/>}/>
            <Route path="/show-solicitud-botiquin/:id" element ={<ShowSolicitudBotiquin/>}/>

            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </ModalProvider>
        </main>
      </div>
    </>
  );
};

export default Home;