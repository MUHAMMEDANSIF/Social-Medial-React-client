import React, { useState, useRef, useEffect } from 'react';
import './ProfileCard.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormData from 'form-data';
import Loader from '../Loder/Loder';
import Cover from '../../img/cover.jpg';
import EditprofileModel from '../EditprofileModal/EditprofileModel';
import { profileupload } from '../../Api/User.Api';
import FollowerlistModal from '../Followlistmodal/Followlistmodal';

function ProfileCard({ Postscount, ProfilePage }) {
  const [ModalOpened, setModalOpened] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const [counts, setCounts] = useState({
    followers: 0,
    following: 0,
    Postscount: 0,
    profileurl: null,
  });

  const User = useSelector((state) => state.user);
  const profileref = useRef();
  const dispatch = useDispatch();

  const formdata = new FormData();
  const onImagechange = (event) => {
    if (event.target.files[0]) {
      formdata.append('profile', event.target.files[0]);
      profileupload(formdata, (response) => {
        if (response.success) {
          dispatch({
            type: 'user',
            payload: response.user,
          });
        }
      });
    }
  };

  useEffect(() => {
    if (User) {
      const followers = User.followers.length > 0 ? User.followers.length : 0;
      const following = User.following.length > 0 ? User.following.length : 0;
      const postcount = Postscount || 0;
      const profileurl = User.profile ? User.profile.profileurl : null;

      setCounts({
        followers,
        following,
        Postscount: postcount,
        profileurl,
      });
    }
  }, [User]);

  if (!User) return (<Loader />);
  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img src={Cover} alt="" />
        <img
          onClick={() => profileref.current.click()}
          src={
                              counts.profileurl
                                ? counts.profileurl
                                : process.env.REACT_APP_PROFILE_URL
                         }
          alt=""
        />
        <input onChange={(e) => onImagechange(e)} style={{ display: 'none' }} type="file" ref={profileref} name="profile" id="" />
      </div>

      <div className="ProfileName">
        <span>{User ? User.username : ''}</span>
        <span>{User ? User.bio : ''}</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="Follow">
            <span onClick={() => setFollowModal('followers')}>
              {counts.followers}
            </span>
            <span>Followers</span>
          </div>
          <div className="vl" />
          <div className="Follow">
            <span onClick={() => setFollowModal('following')}>
              {counts.following}
            </span>
            <span>Following</span>
          </div>
          {ProfilePage && (
          <>
            <div className="vl" />
            <div className="Follow">
              <span>
                {Postscount || 0}
              </span>
              <span>Posts</span>
            </div>
          </>
          )}
        </div>
        <hr />
      </div>
      <span>
        {ProfilePage ? (
          <span onClick={() => setModalOpened(true)}>
            Edit Profile
          </span>
        ) : (
          <Link className="Link" to="/profile">
            My Profile
          </Link>
        )}
      </span>
      <EditprofileModel
        ModalOpened={ModalOpened}
        setModalOpened={setModalOpened}
      />
      <FollowerlistModal ModalOpened={followModal} setModalOpened={setFollowModal} />
    </div>
  );
}

export default React.memo(ProfileCard);
