import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../images/logo.png";

const Header = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link
            to="/">
            <img src={Logo} className="brand-logo" alt="website logo"/>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;