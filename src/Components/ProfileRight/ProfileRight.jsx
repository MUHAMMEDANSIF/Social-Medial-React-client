import React from 'react';
import FollowersCard from '../AllUsers/AllUsers';
import InfoCard from '../InfoCard/InfoCard';
import './ProfileRight.css';

function ProfileLeft() {
  return (
    <div className="ProfileLeft">
      <InfoCard />
      <FollowersCard status={false} />
    </div>

  );
}

export default ProfileLeft;
