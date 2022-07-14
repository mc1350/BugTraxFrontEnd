import React, { useState } from 'react';
import './App.css';
import RouteRoot from './RouteRoot';
import Project from './types/project.type';
import { useAuth0 } from "@auth0/auth0-react";
import SignIn from './components/SignIn';

function App(props) {
  const [tickets, setTickets] = useState([]);
  const [ticketIndex, setTicketIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectIndex, setProjectIndex] =useState(0);
  const [p, setP] = useState<Project>({
    title: '',
    description: ''
  })
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(projects)
  return (
    <div>
      <div className={isAuthenticated? "background" : "login"}></div>
      {isAuthenticated? 
      <RouteRoot projects={projects} setProjects={setProjects} projectIndex={projectIndex} setProjectIndex={setProjectIndex} p={p} setP={setP} users={users} setUsers={setUsers} tickets={tickets} setTickets={setTickets} ticketIndex={ticketIndex} setTicketIndex={setTicketIndex}/>
      : <SignIn/>}
    </div>
  );
}

export default App;
