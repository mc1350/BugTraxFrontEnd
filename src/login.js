import { useAuth0 } from "@auth0/auth0-react";
import {Button } from '@mui/material';
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
  {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}}
   onClick={() => loginWithRedirect()}>Sign In</Button>;
};

export default LoginButton;