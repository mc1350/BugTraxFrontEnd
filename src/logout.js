import { useAuth0 } from "@auth0/auth0-react";
import {Button } from '@mui/material';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
  {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}} 
  onClick={() => logout({ returnTo: window.location.origin })}>
      Sign Out
    </Button>
  );
};

export default LogoutButton;