/* eslint-disable no-underscore-dangle */
import React, {
  useEffect, Fragment, useState, useRef,
} from 'react';
import './Chat.css';
import { Loader } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import FollowersCard from '../../Components/AllUsers/AllUsers';
import ChatBox from '../../Components/ChatBox/ChatBox';
import { allchatster } from '../../Api/Chat.Api';
import NavBar from '../../Components/NavBar/NavBar';
import Conversation from '../../Components/Conversation/Conversation';

function arraysort(array, sorting, userid) {
  const newarray = [];
  sorting.forEach((obj) => {
    const id = obj._id.senderId === userid ? obj._id.receiverid : obj._id.senderId;
    const data = array.find((element) => element.personid._id === id);
    if (data) {
      newarray.push(data);
    }
  });
  return newarray;
}
function Chat() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [currentchat, setcurrentchat] = useState(null);
  const [sendmessages, setSendmessages] = useState(null);
  const [receviemessages, setreceviemessages] = useState(null);
  const [onlineusers, setOnlineusers] = useState(null);
  const User = useSelector((state) => state.user);
  const chatsters = useSelector((state) => state.chatmembers);

  const socket = useRef();

  useEffect(() => {
    if (User) {
      socket.current = io('http://localhost:8000');
      socket.current.emit('new-user-add', User._id);
      socket.current.on('get-users', (users) => {
        setOnlineusers(users);
      });
    }
    setreceviemessages('');
  }, [User]);

  useEffect(() => {
    if (sendmessages !== null) {
      socket.current.emit('send-message', sendmessages);
    }
  }, [sendmessages]);

  useEffect(() => {
    try {
      socket.current.on('recevie-messages', (data) => {
        setreceviemessages(data);
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    allchatster((response) => {
      if (response.success) {
        // eslint-disable-next-line max-len
        response.chatsteres.chatsters = arraysort(response.chatsteres.chatsters, response.order, response.user._id);
        dispatch({
          type: 'chatmembers',
          payload: response.chatsteres,
        });
        dispatch({
          type: 'user',
          payload: response.user,
        });
      }
      setLoader(false);
    });
  }, []);
  if (loader) {
    return (
      <div className="chatloader">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <div className="Chat">
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              <Conversation
                setcurrentchat={setcurrentchat}
                data={chatsters}
                onlineusers={onlineusers}
              />
            </div>

            <h2>Chat Suggestion</h2>
            <div className="Chat-list">
              <FollowersCard status />
            </div>
          </div>
        </div>
        <div className="Right-side-chat">
          <ChatBox
            currentchat={currentchat}
            currentUser={User}
            setSendmessages={setSendmessages}
            receviemessages={receviemessages}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
