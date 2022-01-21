const { useState, createContext } = require("react");


export const AuthContext = createContext();
//in App.jsx ==> {user, login, logout = useContext(authContext)}

const withAuthProvider = (WrappedComponent) => (props) => {
  //this makes no sense
  const [user, setUser] = useState(localStorage.getItem("token") ? { props } : null);




  const providerData = { user }

  return (
    <AuthContext.Provider value={providerData}>
      <WrappedComponent {...props} />
    </AuthContext.Provider>
  );
}

export default withAuthProvider;