
/**
 Check if local storage getime exists 
 return true,
 else return navigate to login page
 IMport function in map and newitem 
 And call it at the beginning
 comment out or remove the logic for islogged in. in app.jsx
 */

import React, { useState } from 'react';

export default function useCheckAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  if (localStorage.getItem("token"))  {
    setIsLoggedIn("true")
  } 
  return {isLoggedIn};
}
