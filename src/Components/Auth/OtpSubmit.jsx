/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { sendotp, otpverification } from '../../Api/Auth.Api';
import SetNewPassword from './SetNewPassword';

// eslint-disable-next-line react/prop-types
function OtpSubmit({
  setOtpSubmit, Otpsubmit, Signuppage, setState, setForgotPassword,
}) {
  const [otp, setOtp] = useState(null);
  const [NewPassword, SetNewpassword] = useState(false);

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const otpresend = () => {
    sendotp(Otpsubmit, (response) => {
      if (response.success) {
        toast.success('OTP send Seccessfully Please check your Email', toastoptions);
      } else {
        toast.error('Otp sending is failed please try again', toastoptions);
      }
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (otp) {
      otpverification(otp, (response) => {
        if (response.success) {
          SetNewPassword(true);
          if (Signuppage) {
            setOtpSubmit(false);
            setState(true);
          } else {
            SetNewPassword(true);
          }
        } else if (response.error === 'jwt expired') {
          toast.error(
            'Your Otp valid only 5 minuts. Its already expaire',
            toastoptions,
          );
        } else if (response.error === 'OTP incorrect') {
          toast.error('Enterd OTP is incorrect Please try again', toastoptions);
        } else if (response.error) {
          toast.error('OTP Verification is failed please try again');
        }
      });
    }
  };

  if (NewPassword) {
    return (
      <SetNewPassword
        OtpSubmit={OtpSubmit}
        SetNewpassword={SetNewpassword}
        setForgotPassword={setForgotPassword}
      />
    );
  }
  return (
    <>
      <form
        onSubmit={(e) => handlesubmit(e)}
        className="form-div infoForm auth-form"
      >
        <h2>OTP verification</h2>
        <span className="Otp-reset-message">
          A verification code has been send to your email
          <span style={{ color: 'green' }}>{Otpsubmit}</span>
          Check your Mail Box as well.
        </span>
        <div>
          <input
            type="text"
            placeholder="OTP"
            className="infoinput"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            name="OTP"
          />
        </div>
        {/* <span className={error ? 'error' : 'no-error'}>{error}</span> */}
        <div>
          <span className="link" onClick={() => otpresend()}>
            resend OTP
          </span>
          <span className="link" onClick={() => setOtpSubmit(false)}>
            Go back
          </span>
        </div>

        <button className="button info-Button" type="submit">
          Send
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default OtpSubmit;
