/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import './ChatBox.css';
import InputEmoji from 'react-input-emoji';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'timeago.js';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { addnewmessage, getallmessage } from '../../Api/Chat.Api';

function ChatBox({
  currentUser,
  currentchat,
  setSendmessages,
  receviemessages,
  setcurrentchat,
  screenWidth,
}) {
  const [newMessage, setNewMessages] = useState('');
  const [chats, setChats] = useState(null);
  const [error, seterror] = useState(null);
  const [inputlength, setinputlength] = useState(null);
  const chatster = useSelector((state) => state.chatmembers);

  const dispatch = useDispatch();

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const messageEnd = useRef(null);

  const handlescroll = () => {
    messageEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const sortchatsterlist = () => {
    if (chats && chats.length > 0) {
      const temp = chatster;
      const index = chatster.findIndex(
        (obj) => obj.chatId === currentchat.chatId,
      );
      temp.splice(index, 1);
      dispatch({
        type: 'chatmembers',
        payload: [currentchat, ...temp],
      });
    }
  };
  const handlesend = () => {
    if (newMessage.length > 0) {
      seterror(null);
      const data = {
        chatId: currentchat.chatId,
        senderId: currentUser._id,
        receiverid: currentchat.personid._id,
        text: newMessage,
      };
      if (chats) setChats([...chats, { ...data, _id: Date.now() }]);
      else setChats([{ ...data, _id: Date.now() }]);
      setTimeout(() => {
        handlescroll();
      }, 100);
      addnewmessage(data, (response) => {
        if (response.success) {
          sortchatsterlist();
          setSendmessages(data);
          setNewMessages('');
        } else {
          toast.error('message send not working', toastoptions);
          setTimeout(() => {
            seterror(null);
          }, 1000);
        }
      });
    } else {
      seterror('Please add somthing and try again');
      setTimeout(() => {
        seterror(null);
      }, 2000);
    }
  };

  const handlechange = (newMessages) => {
    setNewMessages(newMessages);
  };

  useEffect(() => {
    try {
      if (currentchat) {
        const data = {
          currentUser: currentUser._id,
          currentchatster: currentchat.personid._id,
        };
        getallmessage(data, (response) => {
          if (response.success) {
            setChats(response.message);
            setImmediate(() => {
              handlescroll();
            });
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
      setChats([...chats, { ...receviemessages, _id: Date.now() }]);
      sortchatsterlist();
      console.log(receviemessages);
    }
  }, [receviemessages]);

  return (
    <div className="ChatBox-container">
      {currentchat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <div
                  className="back-icon"
                  onClick={() => setcurrentchat(false)}
                >
                  <ArrowBackIcon />
                </div>
                <img
                  src={
                    currentchat.personid.profile
                      ? currentchat.personid.profile.profileurl
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
                  <span>
                    {currentchat ? currentchat.personid.username : ''}
                  </span>
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
                <div
                  key={message._id}
                  className={
                      message.senderId === currentUser._id
                        ? 'message own'
                        : 'message'
                    }
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              ))
              : ''}
            {error ? <Alert severity="error">{error}</Alert> : ''}
            <p style={{ padding: '2px' }} ref={messageEnd} />
          </div>
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji
              onResize={(e) => setinputlength(e.width / 8)}
              maxLength={inputlength}
              value={newMessage}
              onChange={(e) => handlechange(e)}
            />
            <div className="send-button button" onClick={handlesend}>
              {screenWidth > 900 ? 'send' : <RiSendPlaneFill />}
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
