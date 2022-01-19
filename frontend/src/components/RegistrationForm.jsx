import axios from 'axios';
import { useState } from 'react';
// import Button from 'components/Button'

const RegistrationForm = (props) => {

  // States for registration

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [username, setUsername] = useState('');


  // // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };


  const handleConfirmationPassword = (e) => {
    setConfirmationPassword(e.target.value);
    setSubmitted(false);
  };


  const validate = (itemData) => {
    // console.log(itemData);
    return axios.post("http://localhost:8081/api/users", itemData).then(() => {
      console.log(itemData);
      // setPin(itemData);
    });
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '' || confirmationPassword === '') {
      setError(true);
    } else {
      setSubmitted(true);

      setError(false);
      validate({ email, password, username })
    }
  };

  // // Showing success message
  // const successMessage = () => {
  //   return (
  //     <div
  //       className="success"
  //       style={{
  //         display: submitted ? '' : 'none',
  //       }}>
  //       <h1>User {name} successfully registered!!</h1>
  //     </div>
  //   );
  // };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>Register</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {/* {successMessage()} */}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="username">Username: </label>
        <input
          name="username"
          type="text"
          className="username"
          onChange={handleUsername}
          value={username}
        />

        <label className="email">Email: </label>
        <input onChange={handleEmail} className="email"
          value={email} type="email" />

        <label className="password">Password: </label>
        <input
          type="password"
          name="password"
          className="password"
          value={password}
          onChange={handlePassword}
        />

        <label className="password">Confirm Password: </label>
        <input
          type="password"
          name="confirmation_password"
          className="confirmation_password"
          value={confirmationPassword}
          onChange={handleConfirmationPassword}
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm