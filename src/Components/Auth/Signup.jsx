/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Signup as Signupapi } from '../../Api/Auth.Api';
import OtpSubmit from './OtpSubmit';

function Signup({ setState, state }) {
  const [Otpsubmit, setOtpSubmit] = useState(false);
  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };
  const handlevalidation = () => {
    const {
      firstname, lastname, username, email, password, confirmpassword,
    } = formdata;
    if (firstname.length === 0) {
      toast.error('First Name is required', toastoptions);
    } else if (firstname.length < 6) {
      toast.error('First Name must have at least 6 characters', toastoptions);
    } else if (lastname.length === 0) {
      toast.error('Last Name is required', toastoptions);
    } else if (lastname.length < 6) {
      toast.error('Last Name must have at least 6 characters', toastoptions);
    } else if (username.length === 0) {
      toast.error('User Name is required', toastoptions);
    } else if (username.length < 8) {
      toast.error('User Name must have at least 8 characters', toastoptions);
    } else if (email.length === 0) {
      toast.error('Email Name is required', toastoptions);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('please enter the correct email', toastoptions);
    } else if (password.length === 0) {
      toast.error('Password is required', toastoptions);
    } else if (password.length < 10) {
      toast.error('Password must have at least 10 characters', toastoptions);
    } else if (confirmpassword !== password) {
      toast.error('Password and ConfirmPassword must be same', toastoptions);
    } else return true;
    return false;
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (handlevalidation()) {
      Signupapi(formdata, (status) => {
        if (status.success) {
          setOtpSubmit(formdata.email);
        } else if (status.message) {
          toast.error(
            `${status.message[0]} is already taken try another one`,
            toastoptions,
          );
        } else {
          toast.error(status.error, toastoptions);
        }
      });
    }
  };

  const handlechange = (event) => {
    setformdata({ ...formdata, [event.target.name]: event.target.value });
  };
  if (Otpsubmit) {
    return (
      <div className="a-right">
        <OtpSubmit
          setOtpSubmit={setOtpSubmit}
          Otpsubmit={Otpsubmit}
          Signuppage
          setState={setState}
        />
      </div>
    );
  }
  return (
    <>
      <div className="a-right">
        <form
          onSubmit={(event) => handlesubmit(event)}
          className="infoForm auth-form"
        >
          <h2>Signup Up</h2>

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoinput"
              value={formdata.firstname}
              onChange={(event) => handlechange(event)}
              name="firstname"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="infoinput"
              value={formdata.lastname}
              onChange={(event) => handlechange(event)}
              name="lastname"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="User Name"
              className="infoinput"
              value={formdata.username}
              onChange={(event) => handlechange(event)}
              name="username"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoinput"
              value={formdata.email}
              onChange={(event) => handlechange(event)}
              name="email"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoinput"
              value={formdata.password}
              onChange={(event) => handlechange(event)}
              name="password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="infoinput"
              value={formdata.confirmpassword}
              onChange={(event) => handlechange(event)}
              name="confirmpassword"
            />

          </div>

          <div>
            <PasswordStrengthBar password={formdata.password} />
            <PasswordStrengthBar password={formdata.confirmpassword} />
          </div>

          <div>
            <span style={{ fontSize: '12px' }}>
              Already have an account.
              <span className="link" onClick={() => setState(!state)}>
                Login
              </span>
            </span>
          </div>
          <button className="button info-Button" type="submit">
            SignUp
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
