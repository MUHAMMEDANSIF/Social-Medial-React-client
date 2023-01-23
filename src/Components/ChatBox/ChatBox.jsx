/* eslint-disable no-underscore-dangle */
import React, {
  useState, useEffect,
} from 'react';

import './ChatBox.css';
import InputEmoji from 'react-input-emoji';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'timeago.js';
import { addnewmessage, getallmessage } from '../../Api/Chat.Api';

function ChatBox({
  currentUser,
  currentchat,
  setSendmessages,
  receviemessages,
}) {
  const [newMessage, setNewMessages] = useState('');
  const [chats, setChats] = useState(null);

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlesend = () => {
    const data = {
      senderId: currentUser._id,
      receiverid: currentchat._id,
      text: newMessage,
    };
    if (chats) setChats([...chats, data]);
    else setChats([data]);
    addnewmessage(data, (response) => {
      if (response.success) {
        setSendmessages(data);
        setNewMessages('');
      } else {
        toast.error('message send not working', toastoptions);
      }
    });
  };

  const handlechange = (newMessages) => {
    setNewMessages(newMessages);
  };

  useEffect(() => {
    try {
      if (currentchat) {
        const data = {
          currentUser: currentUser._id,
          currentchatster: currentchat._id,
        };
        getallmessage(data, (response) => {
          if (response.success) {
            setChats(response.message);
          } else if (response.error) {
            toast.error(response.error, toastoptions);
          } else {
            toast.error('some network error :', toastoptions);
          }
        });
      } else {
        setChats(null);
      }
    } catch (err) {
      toast.error('some network error', toastoptions);
    }
  }, [currentchat]);

  useEffect(() => {
    if (receviemessages) {
      setChats([...chats, receviemessages]);
    }
  }, [receviemessages]);

  return (
    <div className="ChatBox-container">
      {currentchat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                      currentchat.profile
                        ? currentchat.profile.profileurl
                        : process.env.REACT_APP_PROFILE_URL
                    }
                  alt=""
                  className="followerImage"
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                />
                <div className="name" style={{ fontSize: '0.8rem' }}>
                  <span>{currentchat ? currentchat.username : ''}</span>
                  <span />
                </div>
              </div>

              <hr
                style={{
                  width: '85%',
                  border: '0.1px solid #ececec',
                }}
              />
            </div>
          </div>

          <div className="chat-body">
            {chats
              ? chats.map((message) => (
                <div key={message._id} className={message.senderId === currentUser._id ? 'message own' : 'message'}>
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))
              : (
                ''
              )}
          </div>
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji
              value={newMessage}
              onChange={(e) => handlechange(e)}
            />
            <div className="send-button button" onClick={handlesend}>
              Send
            </div>
          </div>
        </>
      ) : (
        <div className="start-chat">
          <span>Tap on a Chat to start Conversation</span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default ChatBox;
