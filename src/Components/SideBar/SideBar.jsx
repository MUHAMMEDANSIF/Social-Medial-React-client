/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import { toast } from 'react-toastify';
import axios from '../../Api/Axios.instence';

function SideBar() {
  const navigate = useNavigate();

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const Logout = async () => {
    const response = await axios.get('/auth/Logout', { withCredentials: true });
    if (response.success) {
      navigate('/');
    } else {
      toast.error('some network error find please try agin', toastoptions);
    }
  };

  return (
    <div className="SideBar">

      <div className="option">
        <div>
          <i className="fa-solid fa-user-group" />
        </div>
        <div>
          <span>Find Frends</span>
        </div>
      </div>

      <div className="option" onClick={() => navigate('/chat')}>
        <div>
          <i className="fa-solid fa-message" />
        </div>
        <div>
          <span>Massegas</span>
        </div>
      </div>

      <div className="option" onClick={Logout}>
        <div>
          <i className="fa-solid fa-right-from-bracket" />
        </div>
        <div>
          <span>Logout</span>
        </div>
      </div>

    </div>
  );
}

export default SideBar;
