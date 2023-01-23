import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';
import { UilSearch as Searchicon } from '@iconscout/react-unicons';
import Logo from '../../img/logo.png';

function SearchBox() {
  const navigate = useNavigate();

  return (
    <div className="SearchBox">
      <img src={Logo} alt="" onClick={() => navigate('/home')} />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <Searchicon />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
