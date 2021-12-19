import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import classes from './AuthForm.module.css';
import useHttp from '../../hooks/use-http';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const AuthForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    sendRequest: signUpHandler,
    status: signUpStatus,
    error: signUpError,
  } = useHttp(signUp);
  const {
    sendRequest: signInHandler,
    status: signInStatus,
    error: signInError,
  } = useHttp(signIn);

  const [isLogin, setIsLogin] = useState(true);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      isLogin
        ? signInHandler({ ...values, returnSecureToken: true })
        : signUpHandler({ ...values, returnSecureToken: true });
    },
  });
  const switchAuthModeHandler = () => {
    setError('');
    setIsLogin((prevState) => !prevState);
  };
  useEffect(() => {
    if (signUpStatus === 'pending' || signInStatus === 'pending') {
      return (
        <div className="centered">
          <LoadingSpinner />
        </div>
      );
    }

    if (signUpError) {
      setError(signUpError);
    } else if (signInError) {
      setError(signInError);
    }

    if (signUpStatus === 'completed') {
      setIsLogin((prevState) => !prevState);
    }
    if (signInStatus === 'completed') {
      navigate('/quotes');
    }
  }, [navigate, signUpStatus, signInStatus, signUpError, signInError]);

  return (
    <>
      {error ? <p className={classes.error}>{error}</p> : ''}
      <section className={classes.auth}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* <div className={classes.control}>
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="phone">Otp</label>
            <input
              type="otp"
              id="otp"
              name="otp"
              onChange={formik.handleChange}
              value={formik.values.otp}
              required
            />
          </div> */}
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
