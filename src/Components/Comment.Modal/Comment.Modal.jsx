/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import './Comment.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InputEmoji from 'react-input-emoji';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../Loder/Loder';
import {
  getAllComments,
  addnewcomment,
  Commentlike,
  deletecomment,
} from '../../Api/Comment.Api';

function CommentModal({ ModalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  const [loaderworking, setLoaderworking] = useState(false);
  const [comments, setComments] = useState(null);
  const [newcomment, setnewComment] = useState('');
  const [error, setError] = useState(null);

  const User = useSelector((state) => state.user);
  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (ModalOpened) {
      setLoaderworking(true);
      getAllComments(
        { postid: ModalOpened._id, parent: 'root' },
        (response) => {
          if (response.success) {
            const comment = response.comments;
            if (comment) setComments(comment);
          } else {
            toast.error(
              'Comment Loading some error please try again',
              toastoptions,
            );
          }
          setLoaderworking(false);
        },
      );
    }
  }, []);

  const handleSubmit = () => {
    if (newcomment.length > 0) {
      const data = {
        postid: ModalOpened._id,
        text: newcomment,
        user: User._id,
        parent: 'root',
      };
      addnewcomment(data, (response) => {
        if (response.success) {
          setnewComment('');
          setComments([response.comments, ...comments]);
        } else {
          toast.error('Comment post is faild please try again', toastoptions);
        }
      });
    } else {
      setError('Comment is not added');
    }
  };

  const handlechange = (e) => {
    if (e) {
      setnewComment(e);
      setError(null);
    }
  };
  if (loaderworking && ModalOpened) {
    return (
      <Modal
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="40%"
        opened={ModalOpened}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Loader />
      </Modal>
    );
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened={ModalOpened}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className="main">
        <div className="header">
          <ArrowBackIosIcon
            onClick={() => setModalOpened(false)}
            className="back-icon"
          />
          <span className="title">Comments</span>
          <RiSendPlaneFill className="send-icon" />
        </div>

        <div className="comment-box">
          <img className="img" src={process.env.REACT_APP_PROFILE_URL} alt="" />
          <InputEmoji value={newcomment} onChange={(e) => handlechange(e)} />
          <button
            type="button"
            className="button comment-post"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
        {error ? <span style={{ padding: '10px' }} className="error">{error}</span> : ''}
        <hr />
        {comments ? (
          <div className="comment-body">
            {comments.map((element) => (
              <RootComments setComments={setComments} data={element} />
            ))}
            {/* <div className="reply">
          <div>
            <div className="img-div">
              <img className="img" src={process.env.REACT_APP_PROFILE_URL} alt="" />
            </div>

            <div className="comments-body">
              <span className="name">Muhammed Ansif</span>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptate iusto
                atque, cumque amet libero tenetur nobis obcaecati natus

              </span>
              <br />
              <div className="muted">
                <span>2d</span>
                <span><b>5 Like</b></span>
                <span><b>Replay</b></span>
                </div>
                </div>

            <div className="heart">
              <ThumbUpIcon />
            </div>
            </div>
          </div> */}
          </div>
        ) : (
          <div>No Messages found</div>
        )}
      </div>
    </Modal>
  );
}

// eslint-disable-next-line react/prop-types
function RootComments({ data, setComments }) {
  const [liked, setLiked] = useState(null);
  const [likedcount, setLikedcount] = useState(0);

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    setLiked(data.liked);
    setLikedcount(data.likescount);
  }, []);

  const User = useSelector((state) => state.user);

  const commentlike = () => {
    if (!liked) {
      setLikedcount(likedcount + 1);
    } else {
      setLikedcount(likedcount - 1);
    }
    const details = {
      _id: data._id,
      liked,
      commentuserid: User._id,
    };
    setLiked(!liked);
    Commentlike(details, (response) => {
      if (response.success) {
        toast.success(
          `post ${!liked ? 'Like' : 'Dislike'} successfully`,
          toastoptions,
        );
      } else {
        setLiked(!liked);
        toast.error(
          `some network issue we cant complite your ${
            liked ? 'Like' : 'Dislike'
          } request`,
          toastoptions,
        );
      }
    });
  };

  const deleteComment = () => {
    deletecomment(data._id, (response) => {
      if (response.success) {
        setComments(response.comments);
      } else {
        toast.error('some network error find please try agin', toastoptions);
      }
    });
  };

  return (
    <div className="section">
      <div>
        <div className="img-div">
          <img
            className="img"
            src={
              data.users.profile
                ? data.users.profile.profileurl
                : process.env.REACT_APP_PROFILE_URL
            }
            alt=""
          />
        </div>

        <div className="comments-body">
          <span className="name">{data.users.username}</span>
          <span>{data.text}</span>
          <br />
          <div className="muted">
            <span>{format(data.createdAt)}</span>
            <br />
            <span>
              <b>
                {likedcount}
                {' '}
                Likes
              </b>
            </span>
            <span>
              <b>Replay</b>
            </span>
          </div>
        </div>

        <div className="heart">
          <div onClick={commentlike}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
          <div onClick={deleteComment}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
