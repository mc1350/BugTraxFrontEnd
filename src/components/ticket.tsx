import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { deleteTicket, getAllTicket, getTicket, searchByID } from '../services/TicketServices';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { findAssignedByEmail } from '../services/AssignedServices';
import Assigned from '../types/assigned.type';


export default function Tickets(props) {
  const { user } = useAuth0();
  const {tickets, setTickets} = props;
  const [userTickets, setUserTickets] = useState([]);
  const {ticketIndex, setTicketIndex} = props;
  
  let navigate = useNavigate();

  //STATE FOR PROJECT NAV
  const { projectIndex, setProjectIndex } = props;

  //GET TICKETS
  useEffect(() => {
    if (user.sub === "auth0|62b81b203ef05cf3b8d95d94") {
      (async () => {
        const result = await getAllTicket();
        setTickets(result.data);
      })();
    } else {
      (async () => {
        const { email } = user;
        const result = await findAssignedByEmail(email);
        setTickets(result.data);
      })();
    }
  },[]);

  return (
    <div className="home">
      {/* TICKET LIST */}
      <div className='center' style={{ marginTop: '10vh' }}>
        <TableContainer component={Paper} sx={{ width: '150vh', marginLeft: { xl: '25vh' } }} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Tickets
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                  <TableCell></TableCell>}
              </TableRow>
              <TableRow sx={{ backgroundColor: '#ECFDF5' }}>
                <TableCell>
                  Title
                </TableCell>
                <TableCell align="right">
                  ProjectID
                </TableCell>
                <TableCell align="right">
                  Status
                </TableCell>

                {user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                  <TableCell align="right">
                    Delete
                  </TableCell>}

              </TableRow>
            </TableHead>
            <TableBody>
              {tickets && tickets.map((navtickets) => {
                const { id, title, projectID, status } = navtickets;
                return (
                  <TableRow
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" style={{ cursor: 'pointer' }} onClick={() => { navigate(`/project/${projectID}`); setTicketIndex(id); setProjectIndex(projectID); }}>
                      {title}
                    </TableCell>
                    <TableCell align="right">{projectID}</TableCell>
                    <TableCell align="right">{status}</TableCell>
                    {user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                      <TableCell align="right"><IconButton onClick={() => { deleteTicket(id); setTickets(tickets.filter(x => x.id !== id)) }}><DeleteIcon /></IconButton></TableCell>}
                  </TableRow>);
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
