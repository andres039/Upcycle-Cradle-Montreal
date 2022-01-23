import axios from "axios";
import { useNavigate } from "react-router-dom";
const { useState, createContext, useEffect } = require("react");

export const AuthContext = createContext();
//in App.jsx ==> {user, login, logout = useContext(authContext)}

const withAuthProvider = (WrappedComponent) => (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showConfirmationPassError, setShowConfirmationPassError] =
    useState(false);
  const [loginError, setLoginError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleErrorMessageReset = () => {
    setErrorMessage("");
  };

  const handleLogin = (loginData) => {
    console.log("loginData", loginData);
    return axios
      .post("/login", loginData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        // setPin(itemData);
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

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    handleLogin({ email, password });
  };

  // Handling the name change
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmationPassword = (e) => {
    setConfirmationPassword(e.target.value);
  };

  const handleRegistration = (itemData) => {
    if (password !== confirmationPassword) {
      setErrorMessage("🔥 passwords must match 🔥");
      return;
    } else {
      return axios
        .post("/register", itemData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);

          // setPin(itemData);
        })
        .then(() => navigate("/mapview"))
        .catch((err) => {
          console.log("Error record:", err.response);
          setErrorMessage("Email already in use");
        });
    }
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

  const handleNewItem = (itemData) => {
    const tokenKey = localStorage.getItem("token");
    //localStorage.removeItem("token") -- for logout
    console.log(itemData)
    return axios
      .post("/api/pins", itemData, { headers: { token: tokenKey } })
      .then(() => {
        window.location.reload();
      });
    }

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
    handleNewItem
  };

  return (
    <AuthContext.Provider value={providerData}>
      <WrappedComponent {...props} />
    </AuthContext.Provider>
  );

  }
export default withAuthProvider;

