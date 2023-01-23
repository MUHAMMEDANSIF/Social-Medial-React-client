/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { GooeyCircleLoader } from 'react-loaders-kit';
import './Loder.css';

function Loder() {
  const loaderProps = {
    loading: true,
    size: 275,
    duration: 50,
    colors: ['#99fffe', '#f42e00', '#042549'],
  };

  return (
    <div className="loder">
      <div>
        <GooeyCircleLoader {...loaderProps} />
      </div>
      <span>Loding......</span>
    </div>
  );
}

export default Loder;
