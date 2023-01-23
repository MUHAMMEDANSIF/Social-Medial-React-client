import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LeftSide from '../../Components/LeftSide/LeftSide';
// import PostSide from '../../Components/Postside/PostSide';
import RightSide from '../../Components/RightSide/RightSide';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css';
import Loder from '../../Components/Loder/Loder';
import axios from '../../Api/Axios.instence';
import PostSide from '../../Components/Postside/PostSide';

function Home() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const jwtveryfication = async () => {
    const response = await axios.get('/user/home', { withCredentials: true });
    if (response.success) {
      dispatch({
        type: 'user',
        payload: response.user,
      });
      setLoading(false);
    } else {
      navigate('/');
    }
  };
  useEffect(() => {
    jwtveryfication();
  }, []);

  if (Loading) {
    return (
      <div className="Home">
        <Loder />
      </div>
    );
  }
  return (
    <>
      <div className="Nav">
        <NavBar />
      </div>
      <div className="Home">
        <div className="leftside-div">
          <LeftSide />
        </div>
        <div>
          <PostSide />
        </div>
        <div className="rightside-div">
          <RightSide />
        </div>
      </div>
    </>
  );
}

export default Home;
