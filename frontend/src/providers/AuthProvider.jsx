import axios from "axios";
import { useNavigate, use } from "react-router-dom";

const { useState, createContext, useEffect } = require("react");
export const AuthContext = createContext();

const withAuthProvider = (WrappedComponent) => (props) => {
  const userID = localStorage.getItem("user");
  const current_user = userID ? parseInt(userID) : null;

  //Tracking user-related states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showConfirmationPassError, setShowConfirmationPassError] =
    useState(false);
  const [loginError, setLoginError] = useState("");
  const [id, setId] = useState(current_user);
  const [errorMessage, setErrorMessage] = useState("");

  //handle navigation upon successful authentication
  const navigate = useNavigate();

  const handleErrorMessageReset = () => {
    setErrorMessage("");
  };

  // Functions handling username, password, confirmation password and email changes
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmationPassword = (e) => {
    setConfirmationPassword(e.target.value);
  };

  //Handling login functions

  const handleLogin = (loginData) => {
    console.log("loginData", loginData);
    return axios
      .post("/login", loginData)
      .then((response) => {
        getUserId(response.data.user.id);
        localStorage.setItem("token", response.data.token);
      })
      .then(() => navigate("/mapview"))
      .catch((err) => {
        //optional chaining
        console.log("Error record:", err?.response?.data?.message);
        if (err?.response?.data?.message === "Incorrect password") {
          setErrorMessage(err?.response?.data?.message);
          return;
        }
        setErrorMessage(err?.response?.data?.message);
        return;
      });
  };

  const getUserId = (data) => {
    setId(data);
    localStorage.setItem("user", data);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    handleLogin({ email, password });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmationPassword === ""
    ) {
      setErrorMessage("Please enter all the fields");
      return;
    } else {
      handleRegistration({ email, password, username });
    }
  };

  // Handling registration functions

  const handleRegistration = (itemData) => {
    if (password !== confirmationPassword) {
      setErrorMessage("🔥 passwords must match 🔥");
      // setShowConfirmationPassError(true);
      return;
    } else {
      return axios
        .post("/register", itemData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          getUserId(response.data.user.id)
        })
        .then(() => navigate("/mapview"))
        .catch((err) => {
          console.log("Registration error:", err);
          // setShowEmailError(true);
          console.log("Error record:", err.response);
          setErrorMessage("Email already in use");
        });
    }
  };


  // variables to include in user state-related files:
  const providerData = {
    email,
    password,
    confirmationPassword,
    username,
    setEmail,
    setConfirmationPassword,
    setPassword,
    setUsername,
    handleRegistration,
    confirmationPassword,
    handleUsername,
    handlePassword,
    handleEmail,
    handleConfirmationPassword,
    showConfirmationPassError,
    showEmailError,
    handleLogin,
    handleLoginSubmit,
    loginError,
    errorMessage,
    setErrorMessage,
    handleErrorMessageReset,
    handleRegistrationSubmit,
    id,
    setId,
  };

  return (
    <AuthContext.Provider value={providerData}>
      <WrappedComponent {...props} />
    </AuthContext.Provider>
  );
};
export default withAuthProvider;
