/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import axios from '../../Api/Axios.instence';
import { likepost } from '../../Api/Post.Api';
import CommentModal from '../Comment.Modal/Comment.Modal';

function Post({ data }) {
  const [moreoptions, setMoreoptions] = useState(false);
  const [Liked, setLiked] = useState(null);
  const [likescount, setLikesCount] = useState(null);
  const [ModalOpened, setModalOpened] = useState(false);
  const User = useSelector((state) => state.user);

  useEffect(() => {
    setLiked(data.liked);
    setLikesCount(data.likescount);
  }, []);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setMoreoptions(event.currentTarget);
  };

  const handleClose = () => {
    setMoreoptions('false');
  };

  const open = Boolean(moreoptions);

  const handlesubmit = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const formdata = {
          postid: data._id,
          userid: User._id,
          postimage: data.postid,
        };
        const response = await axios.post('/post/delete-post', formdata, {
          withCredentials: true,
        });
        setMoreoptions(false);
        if (response.success) {
          dispatch({
            type: 'posts',
            payload: response.posts,
          });
          swal('Poof! Your Post has been deleted!', {
            icon: 'success',
          });
        }
      } else {
        swal('Your Post is safe!');
      }
    });
  };

  const postlike = (id) => {
    setLikesCount(Liked ? likescount - 1 : likescount + 1);
    setLiked(!Liked);
    likepost({ postid: id }, (response) => {
      if (response.success) {
        dispatch({
          type: 'posts',
          payload: response.posts,
        });
      }
    });
  };

  return (
    <div className="Post">
      <div className="post-more-options">
        <div>
          <IconButton
            aria-label="more"
            onClick={handleClick}
            aria-haspopup="true"
            aria-controls="long-menu"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            moreoptions={moreoptions.toString()}
            keepMounted
            onClose={handleClose}
            open={open}
          >
            <MenuItem onClick={() => handlesubmit('edit')}>edit</MenuItem>
            <MenuItem onClick={() => handlesubmit('save')}>save</MenuItem>
            <MenuItem onClick={() => handlesubmit('delete')}>delete</MenuItem>
          </Menu>
        </div>
      </div>
      <img src={data.posturl} alt="" />

      <div className="PostReact">
        <img
          src={Liked ? Heart : NotLike}
          alt=""
          onClick={() => postlike(data._id)}
        />
        <img src={comment} alt="" onClick={() => setModalOpened(data)} />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>
        {likescount}
        Likes
      </span>

      <div className="detail">
        <span>
          <b>
            {data.users.username}
          </b>
        </span>
        <span>{data.discription}</span>
      </div>
      {ModalOpened ? <CommentModal ModalOpened={ModalOpened} setModalOpened={setModalOpened} /> : ''}
    </div>
  );
}

export default React.memo(Post);
