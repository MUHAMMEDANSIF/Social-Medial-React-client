import React, { useState, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useDispatch } from 'react-redux';
import ProfileRight from '../../Components/ProfileRight/ProfileRight';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import LeftSide from '../../Components/LeftSide/LeftSide';
import PostShare from '../../Components/PostShare/PostShare';
import Posts from '../../Components/Posts/Posts';
import Loder from '../../Components/Loder/Loder';
import NavBar from '../../Components/NavBar/NavBar';
import { userposts } from '../../Api/Post.Api';

function Profile() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const [PostsList, setPostsList] = useState(true);
  const [Postscount, setPostcount] = useState(null);

  const dispatch = useDispatch();
  const jwtveryfication = async () => {
    userposts((response) => {
      if (response.success) {
        console.log(response.posts);
        setPostsList(response.posts);
        setLoading(false);
        setPostcount(response.posts.length);
        dispatch({
          type: 'user',
          payload: response.user,
        });
      } else {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    jwtveryfication();
  }, []);

  if (Loading) {
    return (
      <div className="Profile">
        <LeftSide />
        <Loder />
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <div className="Profile">
        <LeftSide />
        <div className="ProfileCenter">
          <ProfileCard Postscount={Postscount} ProfilePage />
          <PostShare setPostcount={setPostcount} Postscount={Postscount} />
          <Posts PostsList={PostsList} />
        </div>
        <div className="Profile-right">
          <ProfileRight />
        </div>
      </div>
    </>
  );
}

export default Profile;
