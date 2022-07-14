import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Manage from './components/manage'
import NavBar from './components/navbar'
import Project from './components/project'
import SignIn from './components/SignIn'
import Tickets from './components/ticket'
import { useAuth0 } from "@auth0/auth0-react";
import SelectedProject from './components/project'


export default function RouteRoot(props) {
  const {projects, setProjects} = props;
  const {projectIndex, setProjectIndex} = props;
  const {p, setP} = props;
  const {users, setUsers} = props;
  const {tickets, setTickets} = props;
  const {ticketIndex, setTicketIndex} = props;

  const {user} = useAuth0();


  return (
    <div>
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home projects={projects} setProjects={setProjects} projectIndex={projectIndex} setProjectIndex={setProjectIndex} p={p} setP={setP}/>}/>
        <Route path="home" element={<Home projects={projects} setProjects={setProjects} projectIndex={projectIndex} setProjectIndex={setProjectIndex} p={p} setP={setP}/>} />
        <Route path="project/:id" element={<SelectedProject tickets={tickets} setTickets={setTickets} ticketIndex={ticketIndex} setTicketIndex={setTicketIndex} projectIndex={projectIndex} setProjectIndex={setProjectIndex} p={p} setP={setP} users={users} setUsers={setUsers}/>} />
        <Route path="tickets" element={<Tickets tickets={tickets} setTickets={setTickets} ticketIndex={ticketIndex} setTicketIndex={setTicketIndex} ticketprojectIndex={projectIndex} setProjectIndex={setProjectIndex}/>} />
        { user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
        <Route path="manage" element={<Manage users={users} setUsers={setUsers}/>} />}
        <Route path="*" element={
        <main style={{ padding: "1rem" }}>
        <p>Page Not Found</p>
        </main>}/>
      </Route>
      <Route path="signIn" element={<SignIn />} />
    </Routes></div>
  )
}
