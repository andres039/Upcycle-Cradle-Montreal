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

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '' || confirmationPassword === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
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
        <input onChange={handleUsername} className="username"
          value={username} type="text" />

        <label className="email">Email: </label>
        <input onChange={handleEmail} className="email"
          value={email} type="email" />

        <label className="password">Password: </label>
        <input onChange={handlePassword} className="password"
          value={password} type="password" />

        <label className="password">Confirm Password: </label>
        <input onChange={handleConfirmationPassword} className="confirmation_password"
          value={confirmationPassword} type="password" />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm