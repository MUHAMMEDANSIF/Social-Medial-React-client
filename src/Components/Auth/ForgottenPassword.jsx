import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { sendotp } from '../../Api/Auth.Api';
import OtpSubmit from './OtpSubmit';

function ForgottenPass({ setForgotPassword }) {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [Otpsubmit, setOtpSubmit] = useState(false);

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!email) setError('Email Name is required');
    else if (!/\S+@\S+\.\S+/.test(email)) { setError('please enter the correct email'); } else {
      setError(null);
      sendotp(email, (response) => {
        if (response.success) {
          toast.success(`OTP Send to your email:${email}`, toastoptions);
          setOtpSubmit(` ${email} `);
          setEmail('');
        } else if (response.error) {
          toast.error(response.error, toastoptions);
        } else {
          toast.error('Otp sending is failed please try again', toastoptions);
        }
      });
    }
  };
  if (Otpsubmit) {
    return (
      <OtpSubmit
        setOtpSubmit={setOtpSubmit}
        Otpsubmit={Otpsubmit}
        setForgotPassword={setForgotPassword}
      />
    );
  }
  return (
    <form
      onSubmit={(e) => handlesubmit(e)}
      className="form-div infoForm auth-form"
    >
      <h2>Reset Your Password</h2>
      <span className="Otp-reset-message">
        <span style={{ color: 'red' }}>
          Loast your password ?
        </span>
        {' '}
        Please enter your email address. You will recceive
        a link to create a new password via email
      </span>
      <div>
        <input
          type="text"
          placeholder="Email"
          className="infoinput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </div>
      <span className={error ? 'error' : 'no-error'}>{error}</span>
      <div>
        <span className="link" onClick={() => setForgotPassword(false)}>
          Go back
        </span>
      </div>

      <button className="button info-Button" type="submit">
        Send
      </button>
    </form>
  );
}

export default ForgottenPass;
