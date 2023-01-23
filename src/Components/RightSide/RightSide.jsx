import React from 'react';
import './RightSide.css';
import FollowersCard from '../AllUsers/AllUsers';
import ProfileCard from '../ProfileCard/ProfileCard';

function RightSide() {
  return (
    <div className="RightSide">
      <ProfileCard ProfilePage={false} />
      <FollowersCard status={false} />
    </div>
  );
}

export default RightSide;
