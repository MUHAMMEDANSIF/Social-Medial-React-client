import React, { useState } from 'react';
import { Modal, useMantineTheme, Alert } from '@mantine/core';
import { useSelector } from 'react-redux';
import './ProfileModal.css';

function ProfileModal({ ModalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  const User = useSelector((state) => state.user);

  const [formdata, setformdata] = useState({
    workat: User.workat,
    livesin: User.livesin,
    status: User.status,
    password: '',
    confirmpassword: '',
  });

  const [alertopen, setalertopen] = useState('');
  const handlevalidation = () => {
    const { workat, livesin, status } = formdata;

    if (workat === '') setalertopen('Work At filed is requried');
    else if (livesin === '') setalertopen('Lives In filed is requried');
    else if (status === '') setalertopen('Status filed is required');
    else return false;
    return true;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    handlevalidation();
  };

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened={ModalOpened}
      onClose={() => {
        setModalOpened(false);
        setformdata({
          workat: User.workat,
          livesin: User.livesin,
          status: User.status,
          password: '',
          confirmpassword: '',
        });
      }}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        { alertopen && <Alert style={{ height: '50px' }} title="error" color="red">{alertopen}</Alert> }

        <div>
          <input
            type="text"
            placeholder="Work at"
            className="infoinput"
            name="workat"
            value={formdata.workat}
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Lives In"
            className="infoinput"
            name="livesin"
            value={formdata.livesin}
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Status"
            className="infoinput"
            name="status"
            value={formdata.status}
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="infoinput"
            name="password"
            value={formdata.password}
            onChange={(e) => handlechange(e)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="infoinput"
            name="confirmpassword"
            value={formdata.confimpassword}
            onChange={(e) => handlechange(e)}
          />
        </div>
        <div />

        <div>
          <button type="submit" onClick={(e) => handlesubmit(e)} className="button info-Button">Update Details</button>
        </div>
      </form>
    </Modal>
  );
}

export default ProfileModal;
