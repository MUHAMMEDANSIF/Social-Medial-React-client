import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PostShare from '../PostShare/PostShare';
import Posts from '../Posts/Posts';
import './PostSide.css';
import Loder from '../Loder/Loder';
import axios from '../../Api/Axios.instence';

function PostSide() {
  const dispatch = useDispatch();

  const PostsList = useSelector((state) => state.posts);

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    const PostsApi = async () => {
      try {
        const response = await axios.get('/post/all-posts');
        dispatch({
          type: 'posts',
          payload: response.posts,
        });
      } catch (err) {
        toast.error('network issue', toastoptions);
      }
    };
    PostsApi();
  }, []);
  if (!PostsList) {
    return (
      <div className="PostSide">
        <PostShare />
        <div>
          <Loder />
        </div>
      </div>
    );
  }
  return (
    <div className="PostSide">
      <PostShare />
      <Posts PostsList={PostsList} />
    </div>
  );
}

export default React.memo(PostSide);
