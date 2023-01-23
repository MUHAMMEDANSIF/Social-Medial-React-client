import React, { Fragment, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Login as Loginapi } from '../../Api/Auth.Api';
import ForgottenPass from './ForgottenPassword';
import OtpSubmit from './OtpSubmit';

function Login({ state, setState }) {
  const [formdata, setformdata] = useState({
    username: '',
    password: '',
  });
  const [ForgottenPassword, setForgotPassword] = useState(false);
  const [Otpsubmit, setOtpSubmit] = useState(false);

  const navigate = useNavigate();

  const toastoptions = {
    position: 'bottom-left',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlevalidation = () => {
    const { username, password } = formdata;

    if (username.length === 0) toast.error('User Name required', toastoptions);
    else if (username.length < 6) { toast.error('User Name must have at least 6 charaters', toastoptions); } else if (password.length === 0) { toast.error('Password is required', toastoptions); } else if (password.length < 10) { toast.error('Password must have 10 characters', toastoptions); } else return true;
    return false;
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (handlevalidation()) {
      Loginapi(formdata, (status) => {
        if (status.success && status.jwt) {
          navigate('/home');
        } else if (status.success) {
          setOtpSubmit(status.email);
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
        />
      </div>
    );
  }
  return (
    <>
      <div className="a-right">
        {ForgottenPassword ? (
          <ForgottenPass setForgotPassword={setForgotPassword} />
        ) : (
          <form
            onSubmit={(event) => handlesubmit(event)}
            className="infoForm auth-form"
          >
            <h2>Login</h2>

            <div>
              <input
                type="text"
                placeholder="User Name"
                className="infoinput"
                value={formdata.username}
                onChange={(event) => handlechange(event)}
                name="username"
              />

              <input
                type="password"
                placeholder="Password"
                className="infoinput"
                value={formdata.password}
                onChange={(event) => handlechange(event)}
                name="password"
              />
            </div>

            <div>
              <span className="link" onClick={() => setForgotPassword(true)}>
                Forgotten account?
              </span>
            </div>
            <div>
              <span style={{ fontSize: '12px' }}>
                If You dont t an account.
                {' '}
                <span className="link" onClick={() => setState(!state)}>
                  Signup
                </span>
              </span>
            </div>
            <button className="button info-Button" type="submit">
              Login
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
