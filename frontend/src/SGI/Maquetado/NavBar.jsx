import React, {useState} from 'react';


export const NavBar = ({ show, setShow }) => {
    // const [show, setShow] = useState(false);
    return(
      <div>
        <header className={`header ${show ? 'space-toggle' : null}`}>
          <div className='header-toggle' onClick={() => setShow(!show)}>
            <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
            <div className=''>
              {/* <img src="https://odontologia.uchile.cl/.resources/portal-odontologia/images/logo-odontologia.svg" alt=""/> */}
            </div>
          </div>
        </header>
      </div>
    );
};

export default NavBar;