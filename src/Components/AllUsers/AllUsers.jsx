/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import './AllUsers.css';
import { Loader } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllUser, sendfollowrequest } from '../../Api/User.Api';
import { addnewchat } from '../../Api/Chat.Api';

function AllUsers({ status }) {
  const [allusers, setAllUsers] = useState(null);
  const [loader, setLoader] = useState(null);

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };
  useEffect(() => {
    setLoader(true);
    getAllUser((response) => {
      if (response.success) {
        setAllUsers(response.AllUser);
      } else {
        toast.error('some network error find please try agin', toastoptions);
      }
    });
    setLoader(false);
  }, []);
  if (loader) return <Loader />;
  return (
    <div className="FollowersCard">
      <h3>{status ? '' : 'Suggestion for follow'}</h3>
      {allusers
        ? allusers.map((followers) => (
          <div key={followers._id}>
            {status ? (
              <ChatList followers={followers} key={followers._id} />
            ) : (
              <FollowersList followers={followers} key={followers._id} />
            )}
          </div>
        ))
        : ''}
    </div>
  );
}

function FollowersList({ followers }) {
  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlefollow = () => {
    sendfollowrequest(followers._id, (response) => {
      if (response.success) {
        toast.success('Your follow request send seccessfully', toastoptions);
      } else {
        toast.error('some network error find please try agin', toastoptions);
      }
    });
  };

  return (
    <div className="Follower">
      <div>
        <img
          src={
            followers.profile
              ? followers.profile.profileurl
              : process.env.REACT_APP_PROFILE_URL
          }
          alt="retry"
          className="followerimg"
        />
        <div className="name">
          <span>
            {followers.firstname}
            {' '}
            {followers.lastname}
          </span>
          <span>@sample</span>
        </div>
      </div>

      <button onClick={() => handlefollow()} className="button followers-button">Follow</button>
    </div>
  );
}

function ChatList({ followers }) {
  const dispatch = useDispatch();

  const addtochat = (id) => {
    addnewchat({ chatster: id }, (response) => {
      if (response.success) {
        dispatch({
          type: 'chatmembers',
          payload: response.Chatsters,
        });
      }
    });
  };

  return (
    <div className="Follower">
      <div>
        <img
          src={
            followers.profile
              ? followers.profile.profileurl
              : process.env.REACT_APP_PROFILE_URL
          }
          alt="retry"
          className="followerimg"
        />
        <div className="name">
          <span>
            {followers.firstname}
            {' '}
            {followers.lastname}
          </span>
          <span>
            @
            {followers.username}
          </span>
        </div>
      </div>
      <button
        onClick={() => addtochat(followers._id)}
        className="button followers-button"
      >
        Chat
      </button>
    </div>
  );
}

export default AllUsers;
