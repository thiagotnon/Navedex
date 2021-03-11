import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../Services/Auth';
import logoIMG from '../assets/img/logo.svg';

function Navbar(props) {

  function logoutAction() {
    logout();
    props.history.push("/login");
  }
  return (
    isAuthenticated() ? (
      <>
        <header className="nav-header">
          <nav className="navbar">
            <div className="brand">
              <Link to="/">
                <img src={logoIMG} alt="nave.rs" />
              </Link>
            </div>
            <div className="nav-links">
              <button className="btn-exit" onClick={logoutAction}>Sair</button>
            </div>
          </nav>
        </header>
      </>
    ) : ''

  );
}

export default withRouter(Navbar);