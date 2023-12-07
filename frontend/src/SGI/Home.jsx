import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardBodega from './Almacenamiento/Bodega/DashboardBodega';
import SideBar from './Maquetado/SideBar';
import NavBar from './Maquetado/NavBar';
import { ModalProvider } from '../Components/Modal';

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
            <Route path="/dashboard-bodega" element={<DashboardBodega />} />
          </Routes>
        </div>
      </ModalProvider>
      </div>
    </div>
  );
};

export default Home;