/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import './AllUsers.css';
import { Loader } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllUser, sendfollowrequest } from '../../Api/User.Api';
import { addnewchat } from '../../Api/Chat.Api';

function AllUsers({ status }) {
  const [allusers, setAllUsers] = useState(null);
  const [loader, setLoader] = useState(null);
  const [following, setFollowing] = useState(null);

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
        setFollowing(response.following);
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
              <FollowersList
                followers={followers}
                following={following}
                key={followers._id}
              />
            )}
          </div>
        ))
        : ''}
    </div>
  );
}

function FollowersList({ followers, following }) {
  const [remove, setRemove] = useState(false);
  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlefollow = () => {
    sendfollowrequest(followers._id, (response) => {
      console.log(response);
      if (response.success) {
        toast.success('Your follow request send seccessfully', toastoptions);
        setRemove(true);
      } else {
        toast.error('some network error find please try agin', toastoptions);
      }
    });
  };
  const findfollowing = () => {
    const status = following.find((user) => user.followerid === followers._id);
    if (status) return true;
    return false;
  };
  if (findfollowing()) return null;
  if (remove) return null;
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
        onClick={() => handlefollow()}
        className="button followers-button"
      >
        Follow
      </button>
    </div>
  );
}

function ChatList({ followers }) {
  const dispatch = useDispatch();
  const chatsters = useSelector((state) => state.chatmembers);
  const [remvoeuser, setRemoveuser] = useState();

  const addtochat = (id) => {
    addnewchat({ chatster: id }, (response) => {
      if (response.success) {
        dispatch({
          type: 'chatmembers',
          payload: response.Chatsters,
        });
        setRemoveuser(true);
      }
    });
  };
  const findexistchatster = () => {
    if (!chatsters) return false;
    const status = chatsters.chatsters.find(
      (user) => user.personid._id === followers._id,
    );
    if (status) return true;
    return false;
  };
  if (findexistchatster()) return '';
  if (remvoeuser) return '';
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
