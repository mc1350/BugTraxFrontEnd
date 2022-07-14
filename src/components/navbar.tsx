import { Drawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LogoutButton from '../logout';
import { useAuth0 } from "@auth0/auth0-react";



export default function NavBar(props) {
  let navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const {user} = useAuth0();

  return (
    <div>
      {/* DESKTOP */}
      <Drawer className='AppBar' variant="permanent" anchor="left" sx={{
        display: { xs: 'none', sm: 'none', md: 'none', lg:'none', xl: 'block' }
      }}>
        {/* LOGO */}
        <div className="nav">
        <img src={require('./logo.png')} style={{width: 100}} />
        </div>
        <List >
          {/*DASHBOARD */}
          <ListItem>
            <ListItemButton onClick={() => navigate('Home')}>
              <ListItemIcon>
                <DesktopWindowsIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* TICKETS */}
          <ListItem>
            <ListItemButton onClick={() => navigate('/tickets')}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Tickets" />
            </ListItemButton>
          </ListItem>

          {/* MANAGE */}
          { user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
          <ListItem>
            <ListItemButton onClick={() => navigate('/manage')}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Manage" />
            </ListItemButton>
          </ListItem>}
          </List>

          {/* SIGN OUT */}
          <div className="nav">
            {LogoutButton()}
          </div>
      </Drawer>

      {/* RESPONSIVE */}
      
      <Button onClick={()=> setOpenMenu(true)} sx={{display: {xs: 'block', sm:'block', md:'block', lg: 'block', xl:'none'}}} ><MenuIcon sx={{color: '#10B981'}}/></Button>
      <Drawer open={openMenu} className='AppBar' variant="temporary" anchor="left" sx={{
        display: {xs: 'block', sm:'block', md:'block', lg: 'block', xl:'none'}
      }}>
        {/* LOGO */}
        <div className="nav">
        <img src={require('./logo.png')} style={{width: 100}} />
          {/* <ListItemText primary="BugTrax" sx={{ color: '#10B981', textTransform: 'uppercase', fontWeight: 800 }} /> */}
        </div>
        <List >
          {/*DASHBOARD */}
          <ListItem>
            <ListItemButton onClick={() => {navigate('/home'); setOpenMenu(false);}}>
              <ListItemIcon>
                <DesktopWindowsIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* TICKETS */}
          <ListItem>
            <ListItemButton onClick={() => {navigate('/tickets'); setOpenMenu(false);}}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Tickets" />
            </ListItemButton>
          </ListItem>

          {/* MANAGE */}
          { user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
          <ListItem>
            <ListItemButton onClick={() => {navigate('/manage'); setOpenMenu(false);}}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Manage" />
            </ListItemButton>
          </ListItem>}
          </List>

          {/* RESPONSIVE MENU*/}
          <ListItem>
            <ListItemButton onClick={()=> {setOpenMenu(false); setOpenMenu(false);}}>
              <ArrowBackIosIcon/>
            </ListItemButton>
          </ListItem>

          {/* SIGN OUT */}
          <div className="nav">
            {LogoutButton()}
          </div>
      </Drawer>
      <Outlet />
    </div>
  )
}
