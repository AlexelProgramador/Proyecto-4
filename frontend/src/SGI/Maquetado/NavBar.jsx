import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBar = ({ show, setShow }) => {
    // const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const response = JSON.parse(localStorage.getItem("response"));
    const user = response && response.username

    useEffect(() => {
      const response = JSON.parse(localStorage.getItem("response"));
      if (!response || !response.username) {
        navigate("/login");
      }
    }, [navigate]);  


    return(
      <div>
        <header className={`header ${show ? 'space-toggle' : null}`}>
          <div className='header-toggle' onClick={() => setShow(!show)}>
            <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
          </div>
          <div className='h-100 text-end d-flex align-items-center' style={{ color: '#1E4162', fontSize: '14px' }}>
              {/* <img src={logo} alt="" className='h-100'/> */}
            {/* <p className='m-0'>Sistema de Inventario y</p>
            <p className='m-0'>Gestión de Stock</p> */}
            <p className='m-0 d-flex align-items-center px-1 pt-1' style={{fontSize: '12px'}}><i className="fi fi-sr-user"></i></p>
            <p className='m-0 '>{user && (<>{response.username}</>)}</p>
          </div>
        </header>
      </div>
    );
};

export default NavBar;