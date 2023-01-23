/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { forgottenpassword } from '../../Api/Auth.Api';

// eslint-disable-next-line react/prop-types
function SetNewPassword({ OtpSubmit, SetNewpassword, setForgotPassword }) {
  const [formdata, setFormdata] = useState({
    password: '',
    confirmpassword: '',
  });
  const [formdataerror, setFormdataerror] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlevalidation = () => {
    const { password, confirmpassword } = formdata;
    // eslint-disable-next-line no-unused-vars
    let error = false;
    const errormessage = {
      newpassword: null,
      confirmpassword: null,
    };
    if (password === '') {
      errormessage.newpassword = 'Password is required';
      error = true;
    } else if (password.length < 10) { errormessage.newpassword = 'please enter at least 10 characters'; error = true; } else { errormessage.newpassword = ''; }
    if (confirmpassword === '') {
      errormessage.confirmpassword = 'ConfirmPasswrod is required';
      error = true;
    } else if (confirmpassword !== password) {
      errormessage.confirmpassword = 'please enter same password';
      error = true;
    } else {
      errormessage.confirmpassword = '';
    }
    setFormdataerror(errormessage);
    if (error) return true;
    return true;
  };

  const handlesubmit = (e) => {
    setFormdataerror({ ...formdataerror, newpassword: 'password' });
    e.preventDefault();
    if (handlevalidation()) {
      const data = {
        email: OtpSubmit,
        password: formdata.password,
      };
      forgottenpassword(data, (response) => {
        if (response.success) {
          toast.success('Password is reset seccessfully', toastoptions);
          setForgotPassword(false);
        } else {
          toast.error('Password is reset filed please try again', toastoptions);
        }
      });
    }
  };

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    handlevalidation();
  };
  return (
    <>
      <form onSubmit={(e) => handlesubmit(e)} className="infoForm auth-form">
        <h2>Create New Password</h2>
        <span>
          Create a new, strong password that you don't use for other website
        </span>

        <div>
          <input
            type="password"
            placeholder="Enter New Password"
            className="infoinput"
            value={formdata.newpassword}
            onChange={(e) => handlechange(e)}
            name="newpassword"
          />

          <input
            type="password"
            placeholder="Confirm Passwrod"
            className="infoinput"
            value={formdata.confirmpassword}
            onChange={(e) => handlechange(e)}
            name="confirmpassword"
          />

        </div>

        <div className={formdata.password !== '' || formdata.confirmpassword !== '' ? 'error' : 'no-error'}>
          <span className="errror">{formdataerror.newpassword}</span>
          <span className="errror">{formdataerror.confirmpassword}</span>
        </div>

        <div>
          <span className="link" onClick={() => SetNewpassword(false)}>
            Go Back
          </span>
        </div>
        <button className="button info-Button" type="submit">
          Change
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default SetNewPassword;
