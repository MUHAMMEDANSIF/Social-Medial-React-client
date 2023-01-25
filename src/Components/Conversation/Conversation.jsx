/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';

function Conversation({ setcurrentchat, onlineusers }) {
  const data = useSelector((state) => state.chatmembers);

  const findonlineusers = (chat) => {
    if (onlineusers) {
      const status = onlineusers.find((element) => element.userId === chat.personid._id);
      return !!status;
    }
    return false;
  };

  if (!data) {
    return (
      <div>
        You have no chat yet
      </div>
    );
  }
  return (
    <>
      {data.chatsters.map((element) => (
        <div key={element._id}>
          <div className="follower conversation">
            <div onClick={() => setcurrentchat(element)}>
              {
                findonlineusers(element)
                  ? <div className="online-dot" />
                  : ''
              }
              <img
                src={
                    element.personid.profile
                      ? element.personid.profile.profileurl
                      : process.env.REACT_APP_PROFILE_URL
                  }
                alt=""
                className="followerImage"
                style={{ width: '50px', height: '50px' }}
              />
              <div className="name" style={{ fontSize: '0.8rem' }}>
                <span>
                  {element.personid ? element.personid.username : ''}
                </span>
                <span>Online</span>
              </div>
            </div>
          </div>
          <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </div>
      ))}
    </>
  );
}

export default Conversation;
