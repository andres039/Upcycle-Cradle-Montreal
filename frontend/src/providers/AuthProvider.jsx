import axios from "axios";
import { useNavigate } from "react-router-dom";
const { useState, createContext } = require("react");


export const AuthContext = createContext();
//in App.jsx ==> {user, login, logout = useContext(authContext)}

const withAuthProvider = (WrappedComponent) => (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [username, setUsername] = useState("");


  const navigate = useNavigate();

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
      console.log("🔥 passwords must match 🔥");
      setConfirmationPassword("error");
      return;
    } else {

      return axios
        .post("/register", itemData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);

          // setPin(itemData);
        })
        .then(() => navigate("/mapview"));
    }
  };


  const providerData = { email, password, confirmationPassword, username, setEmail, setConfirmationPassword, setPassword, setUsername, handleRegistration, confirmationPassword, handleUsername, handlePassword, handleEmail, handleConfirmationPassword }

  return (
    <AuthContext.Provider value={providerData}>
      <WrappedComponent {...props} />
    </AuthContext.Provider>
  );
}

export default withAuthProvider;