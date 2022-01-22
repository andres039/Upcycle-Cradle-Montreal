import axios from "axios";
import { useNavigate } from "react-router-dom";

const { useState, createContext } = require("react");
export const AuthContext = createContext();


const withAuthProvider = (WrappedComponent) => (props) => {

  //Tracking user-related states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showConfirmationPassError, setShowConfirmationPassError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [id, setId] = useState(null);

  //handle navigation upon successful authentication
  const navigate = useNavigate();

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
    return axios
      .post("/login", loginData)
      .then((response) => {
        getUserId(response.data.user.id)
        localStorage.setItem("token", response.data.token);

      })
      .then(() => navigate("/mapview")).catch((err) => {
        console.log("Login error:", err);
        setShowEmailError(true);
      });
  }


  //helper fct

  const getUserId = (data) => setId(data);

  const handleLoginSubmit = event => {
    event.preventDefault();
    if (
      email === "" ||
      password === ""
    ) {
      setLoginError(true);
      return
    }
    handleLogin({ email, password })
  }



  // Handling registration functions

  const handleRegistration = (itemData) => {
    if (password !== confirmationPassword) {
      console.log("🔥 passwords must match 🔥");
      setShowConfirmationPassError(true);
      return;
    } else {

      return axios
        .post("/register", itemData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);

        })
        .then(() => navigate("/mapview")).catch((err) => {
          console.log("Registration error:", err);
          setShowEmailError(true);
        });
    }
  };

  // variables to include in user state-related files:
  const providerData = {
    email, password, confirmationPassword, username,
    setEmail, setConfirmationPassword, setPassword, setUsername, handleRegistration,
    confirmationPassword, handleUsername, handlePassword, handleEmail,
    handleConfirmationPassword, showConfirmationPassError, showEmailError,
    handleLogin, handleLoginSubmit, loginError, id, setId
  }

  return (
    <AuthContext.Provider value={providerData}>
      <WrappedComponent {...props} />
    </AuthContext.Provider>
  );
}

export default withAuthProvider;