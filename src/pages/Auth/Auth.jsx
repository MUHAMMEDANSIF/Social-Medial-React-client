import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/logo.png';
import 'react-toastify/dist/ReactToastify.css';
import Loder from '../../Components/Loder/Loder';
import { jwtverifycation } from '../../Api/Auth.Api';
import Login from '../../Components/Auth/Login';
import Signup from '../../Components/Auth/Signup';
import './Auth.css';

function Auth() {
  const [state, setState] = useState(true);

  const [Loderworking, setLoderworking] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    jwtverifycation((status) => {
      if (status.success) {
        navigate('/home');
      } else {
        setLoderworking(false);
      }
    });
  });

  if (Loderworking) return <Loder />;
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Media</h1>
          <h6>
            Explore the ideas throughout the world
          </h6>
        </div>
      </div>
      {state ? (
        <Login state={state} setState={setState} />
      ) : (
        <Signup state={state} setState={setState} />
      )}
    </div>
  );
}

export default Auth;
