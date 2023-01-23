/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function LinearBuffer({ Loader, setLoader }) {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [Color, setColor] = useState('primary');

  const dispatch = useDispatch();

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
        if (Loader.status) {
          setColor('success');
          toast.success('Post updated seccessfully', toastoptions);
          setTimeout(() => {
            setLoader(false);
            dispatch({
              type: 'posts-updated',
              payload: Loader.response.posts,
            });
          }, 2000);
        }
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="buffer"
        color={Color}
        value={progress}
        valueBuffer={buffer}
      />
    </Box>
  );
}

export default LinearBuffer;
