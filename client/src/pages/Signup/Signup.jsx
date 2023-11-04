import './Signup.css';
import Top5 from '../../assets/top5-logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      console.log('HERE');
      const result = await addUser({
        variables: { ...formState },
      });
      console.log(result);

      Auth.login(result.data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="main-container">
      {data ? (
        <p>
          <Link to="/"></Link>
        </p>
      ) : (
        <div className="signup-container">
          <h1>Sign-Up!</h1>
          <img src={Top5} alt="Top5 Logo"></img>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              className="form-input"
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form-input"
              placeholder="**********"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
          <Link className="goback" to="/">
            Go Back
          </Link>
        </div>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default Signup;
