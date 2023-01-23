/* eslint-disable react/prop-types */
import React from 'react';
import './Posts.css';
import Post from '../Post/Post';

function Posts({ PostsList }) {
  return (
    <div className="Posts">
      {
          PostsList.map((data) => (
            <Post data={data} key={data._id} />
          ))
        }
    </div>
  );
}

export default React.memo(Posts);
