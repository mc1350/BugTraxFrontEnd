import { Box, TextField, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemIcon, ListItemButton, TablePagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { getProject } from '../services/ProjectServices';
import { deleteTeamMember, findTeam, saveTeamMember } from '../services/TeamServices';
import DeleteIcon from '@mui/icons-material/Delete';
import Team from '../types/team.type';
import { getAllUser } from '../services/UserServices';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { useAuth0 } from "@auth0/auth0-react";
import { deleteTicket, findTicketById, getTicket, saveTicket, updateTicket } from '../services/TicketServices';
import Ticket from '../types/ticket.type';
import Assigned from '../types/assigned.type';
import { deleteAssignment, findAssignedByID, saveAssignment } from '../services/AssignedServices';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { Block, Rowing } from '@mui/icons-material';
import { deleteComment, findCommentByID, saveComment } from '../services/CommentServices';
import Comments from '../types/comments.type';
import UpdateIcon from '@mui/icons-material/Update';
import Project from '../types/project.type';



const moment = require('moment');

function SelectedProject(props) {
  const { user: Auth } = useAuth0();
  const [project, setProject] = useState<Project>({
  title: '',
  description: '',
  });
  const { projectIndex, setProjectIndex } = props;
  const [team, setTeam] = useState([]);
  const { users, setUsers } = props;
  const { tickets, setTickets } = props;
  const { ticketIndex, setTicketIndex } = props;
  const [assignedDevs, setAssignedDevs] = useState([]);
  const [comments, setComments] = useState([]);
  const [c, setC] = useState<Comments>({
    user: '',
    body: '',
    created: null,
    ticketID: 0
  })


  //DIALOG PROPS
  const [editTicket, setEditTicket] = useState(false);
  const [newAssignment, setNewAssignment] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState(false);
  const [newTicket, setNewTicket] = useState(false);
  const [ti, setTi] = useState<Ticket>({
    title: "",
    description: "",
    projectID: 0,
    priority: "",
    status: "",
    created: null,
    updated: null,
    assigned: ""
  })
  const [t, setT] = useState<Team>({
    user: '',
    contact: '',
    projectID: 0
  });
  const [newComment, setNewComment] = useState(true);


  const [a, setA] = useState<Assigned>({
    user: '',
    ticketID: 0,
    email: ''
  });


  // PAGINATION PROPS 
  //Tickets
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    3 - Math.min(3, tickets.length - page * 3);
  
//Teams
const [teamPage, setTeamPage] = useState(0);

const handleChangeTeamPage = (event, newPage) => {
  setPage(newPage);
};
const emptyTeamRows =
    3 - Math.min(3, team.length - teamPage * 3);
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    (async () => {
      const result = await getProject(window.location.pathname);
      setProject(result.data);
    })();
  }, []);

  useEffect(() => {
    setProjectIndex(project.id);
  }, [project]);

  useEffect(() => {
    (async () => {
      const result = await findTeam(projectIndex);
      setTeam(result.data);
    })();
  }, [projectIndex, newTeamMember]);

  useEffect(() => {
    (async () => {
      const result = await findTicketById(projectIndex);
      setTickets(result.data);
    })();
  }, [team, newTicket])

  useEffect(() => {
    (async () => {
      const result = await getAllUser();
      setUsers(result.data);
    })();
  }, [newTeamMember])

  useEffect(() => {
    if (ticketIndex)
      (async () => {
        const result = await getTicket(ticketIndex);
        setTi(result.data);
      })();
  }, [ticketIndex, editTicket])

  useEffect(() => {
    if (ticketIndex)
      (async () => {
        const result = await findAssignedByID(ticketIndex);
        setAssignedDevs(result.data);
      })();
  }, [ticketIndex, newAssignment])

  useEffect(() => {
    if (ticketIndex)
      (async () => {
        const result = await findCommentByID(ticketIndex);
        setComments(result.data);
      })();
  }, [ticketIndex, newComment])



  return (
    <div>
      <div>
        <Typography sx={{ fontSize: 20, p: 2, color: 'white', marginLeft: { xl: '40vh' } }}>{project.title}</Typography>
      </div>

      {/* CREATE TEAM */}
      <div>
        <Dialog open={newTeamMember} onClose={() => setNewTeamMember(false)}>
          <DialogTitle>Add a Member</DialogTitle>
          <DialogContent>
            <FormControl>
              <RadioGroup>

                {users && users.map((navusers) => {
                  const { id, name, email } = navusers;
                  return (
                    <FormControlLabel key={id} value={name} control={<Radio />} label={name} onChange={(e) => setT({
                      user: `${name}`,
                      contact: `${email}`,
                      projectID: projectIndex
                    })
                    } />);
                })}
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewTeamMember(false)}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setNewTeamMember(false);
              saveTeamMember(t);
            }}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* CREATE TICKET */}
      <div>
        <Dialog open={newTicket} onClose={() => setNewTicket(false)}>
          <DialogTitle>Create a New Ticket</DialogTitle>
          <div>
            <form>
              <TextField id="title" label="title" variant="standard" value={ti.title} onChange={(e) => setTi({ ...ti, title: e.target.value })}
                sx={{ margin: 1, '& .MuiInputRoot': { color: '#10B981' } }} />
              <TextField id="description" label="description" variant="standard" value={ti.description} onChange={(e) => setTi({ ...ti, description: e.target.value })}
                sx={{ margin: 1 }} />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Priority</FormLabel>
                <RadioGroup>
                  <FormControlLabel value="Low" control={<Radio />} label="Low" onChange={() => setTi({ ...ti, priority: "Low" })} />
                  <FormControlLabel value="Medium" control={<Radio />} label="Medium" onChange={() => setTi({ ...ti, priority: "Medium" })} />
                  <FormControlLabel value="High" control={<Radio />} label="High" onChange={() => setTi({ ...ti, priority: "High" })} />
                </RadioGroup>
              </FormControl>
            </form>
          </div>
          <DialogActions>
            <Button onClick={() => setNewTicket(false)}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setNewTicket(false);
              saveTicket({ ...ti, status: "New", created: `${currentDate}`, projectID: projectIndex, assigned: Auth.email });
            }}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* UPDATE TICKET STATUS */}
      <div>
        <Dialog open={editTicket} onClose={() => setEditTicket(false)}>
          <DialogTitle>Update Status of Ticket #{ti.id}</DialogTitle>
          <div>
            <form>
              <FormControl sx={{padding: 3}}>
                <FormLabel id="demo-radio-buttons-group-label">Priority</FormLabel>
                <RadioGroup>
                  <FormControlLabel value="New" control={<Radio />} label="New" onChange={() => setTi({ ...ti, status: "New" })} />
                  <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" onChange={() => setTi({ ...ti, status: "In Progress" })} />
                  <FormControlLabel value="Resolved" control={<Radio />} label="Resolved" onChange={() => setTi({ ...ti, status: "Resolved" })} />
                </RadioGroup>
              </FormControl>
            </form>
          </div>
          <DialogActions>
            <Button onClick={() => setEditTicket(false)}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setEditTicket(false);
              updateTicket(ti.id, { ...ti, updated: `${currentDate}` });
            }}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* ADD ASSIGNMENT */}
      <div>
        <Dialog open={newAssignment} onClose={() => setNewAssignment(false)}>
          <DialogTitle>{`Assign a Member to Ticket #${ticketIndex}`}</DialogTitle>
          <DialogContent>
            <FormControl>
              <RadioGroup>
                {team && team.map((navteams) => {
                  const { id, user, contact } = navteams;
                  return (
                    <FormControlLabel key={id} value={user} control={<Radio />} label={user} onChange={(e) => setA({
                      user: `${user}`,
                      ticketID: ticketIndex,
                      email: `${contact}`
                    })
                    } />);
                })}
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewAssignment(false)}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Cancel
            </Button>
            <Button onClick={() => {
              setNewAssignment(false);
              saveAssignment(a);
            }}
              sx={{
                color: '#2B283A', borderColor: '#2B283A', '&:hover':
                  { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
              }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* START LAYOUT DIV */}
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: 10}}> */}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr)', gridGap: '2em'}}>
        {/* TEAM LIST */}
        <Box sx={{ marginTop: '10vh', width: 'auto', marginLeft: { xl: '15vw' } }} >
        <Paper sx={{ mb: 2 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{height: 93}}>
                  <TableCell>
                    Teams
                  </TableCell>
                  <TableCell></TableCell>
                  {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                    <TableCell align="right">
                      <IconButton onClick={() => {
                        setT({
                          user: '',
                          contact: '',
                          projectID: 0
                        });
                        setNewTeamMember(true);
                      }}>
                        <AddIcon /></IconButton>
                    </TableCell>}
                </TableRow>
                <TableRow sx={{ backgroundColor: '#ECFDF5' }}>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell align="right">
                    Contact
                  </TableCell>
                  {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                    <TableCell align="right">
                      Remove
                    </TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {team && team
                  .slice(teamPage * 3, teamPage * 3 + 3)
                  .map((navteam) => {
                  const { id, user, contact } = navteam;
                  return (
                    <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" style={{ cursor: 'pointer' }}>
                        {user}
                      </TableCell>
                      <TableCell align="right">{contact}</TableCell>
                      {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                        <TableCell align="right"><IconButton onClick={() => { deleteTeamMember(id); setTeam(team.filter(x => x.id !== id)) }}><PersonRemoveAlt1Icon /></IconButton></TableCell>}
                      </TableRow>);
                  })}
                  {emptyTeamRows > 0 && (
                  <TableRow style={{ height: 73 * emptyTeamRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
                  component="div"
                  count={team.length}
                  page={teamPage}
                  onPageChange={handleChangeTeamPage}
                  rowsPerPage={3}
                  rowsPerPageOptions={[]}
                />
        </Paper>
        </Box>

        {/* TICKET LIST */}
        <Box sx={{ marginTop: '10vh', width: 'auto'}} >
        <Paper sx={{ mb: 2 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Tickets
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                    <TableCell align="right">
                      <Button variant="outlined" sx={{ color: '#2B283A', borderColor: '#2B283A', '&:hover': { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' } }} onClick={() => {
                        setTi({
                          title: "",
                          description: "",
                          projectID: 0,
                          priority: "",
                          status: "",
                          created: null,
                          updated: null,
                          assigned: ""
                        });
                        setNewTicket(true);
                      }}>New <br/> Ticket</Button>
                    </TableCell>}
                </TableRow>
                <TableRow sx={{ backgroundColor: '#ECFDF5' }}>
                  <TableCell>
                    Title
                  </TableCell>
                  <TableCell align="right">
                    Description
                  </TableCell>
                  <TableCell align="right">
                    Author
                  </TableCell>

                  {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                    <TableCell align="right">
                      Delete
                    </TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets && tickets
                  .slice(page * 3, page * 3 + 3)
                  .map((navtickets) => {
                    const { id, title, description, assigned } = navtickets;
                    return (
                      <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" style={{ cursor: 'pointer' }} onClick={() => { setTicketIndex(id); }}>
                          {title}
                        </TableCell>
                        <TableCell align="right">{description}</TableCell>
                        <TableCell align="right">{assigned}</TableCell>
                        {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                          <TableCell align="right"><IconButton onClick={() => { deleteTicket(id); setTickets(tickets.filter(x => x.id !== id)) }}><DeleteIcon /></IconButton></TableCell>}
                      </TableRow>);
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 73 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
          
          </TableBody>
          </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={tickets.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={3}
            rowsPerPageOptions={[]}
          />
          </Paper>
          </Box>
      </div>
      {/* END LAYOUT DIV */}

      {/* SELECTED TICKET INFO */}
      <div className='center' style={{ marginTop: '10vh', marginBottom: '2vh'}}>
        <Card sx={{marginLeft: { xl: '15vw' } }}>
          <CardContent sx={{ display: 'grid', gridTemplateRows: '1fr', gridRowGap: '5vh' }}>
            <Typography>
              {`Ticket #${ticketIndex}`}
            </Typography>
            {ticketIndex ?
              <div>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gridColumnGap: '5vh' }}>
                  <Typography>
                    <span style={{ color: '#10B981' }}>
                      TITLE
                    </span>
                    <br />
                    {ti.title}
                  </Typography>
                  <Typography>
                    <span style={{ color: '#10B981' }}>
                      AUTHOR
                    </span>
                    <br />
                    {ti.assigned}
                  </Typography>
                  <Typography>
                    <span style={{ color: '#10B981' }}>
                      DESCRIPTION
                    </span>
                    <br />
                    {ti.description}
                  </Typography>
                </Box>
                <br />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridColumnGap: '5vw' }}>
                  {/* STATUS BUTTON */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}>
                    <Typography sx={{ marginTop: 0.3 }}>
                      <span style={{ color: '#10B981' }}>
                        STATUS
                      </span>
                      <br />
                      {ti.status}
                    </Typography>
                    <IconButton aria-label="Update" size="small" onClick={() => { setEditTicket(true);}}>
                      <UpdateIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </div>
                  <Typography>
                    <span style={{ color: '#10B981' }}>
                      PRIORITY
                    </span>
                    <br />
                    {ti.priority}
                  </Typography>
                  <Typography>
                    <span style={{ color: '#10B981' }}>
                      CREATED
                    </span>
                    <br />
                    {moment(ti.created).utc().format('YYYY-MM-DD')}
                  </Typography>
                  <Typography>
                    <span style={{ color: '#10B981' }}>
                      UPDATED
                    </span>
                    <br />
                    {moment(ti.updated).utc().format('YYYY-MM-DD')}
                  </Typography>
                </Box>
                <br />
                <div><hr /></div>
                <br />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <Box >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                      <div>
                        <Typography sx={{ color: '#10B981', marginTop: 1 }}>
                          ASSIGNED DEVS
                        </Typography>
                      </div>
                      <div>
                        {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                          <IconButton sx={{ maxwidth: '10px' }}>
                            <AddIcon onClick={() => {
                              setA({
                                user: '',
                                ticketID: 0,
                                email: ''
                              });
                              setNewAssignment(true);
                            }} />
                          </IconButton>}
                      </div>
                    </div>
                    {/* ASSIGNED DEVS*/}
                    <ul style={{ listStyle: 'none' }}>
                      {assignedDevs && assignedDevs.map((navassigned) => {
                        const { id, user } = navassigned;
                        return (
                          <li key={id}>
                            {user}
                            {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                              <IconButton onClick={() => { deleteAssignment(id); setAssignedDevs(assignedDevs.filter(x => x.id !== id)) }}>
                                <ClearIcon sx={{ '&:hover': { cursor: 'pointer' } }} />
                              </IconButton>}
                          </li>)
                      })}
                    </ul>
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#10B981', marginTop: 1 }}>
                      COMMENTS
                    </Typography>
                    {/* CREATE COMMENT */}
                    <div style={{ marginTop: 5, marginBottom: 5 }}>
                      <TextField sx={{ '& .MuiInputRoot': { color: '#10B981' } }}
                        id="comment" label="comment" variant="outlined" value={c.body} size="small" onChange={(e) => { setC({ ...c, body: e.target.value }); setNewComment(false); }} />
                      <Button onClick={() => { saveComment({ ...c, user: Auth.email, created: `${currentDate}`, ticketID: ticketIndex }); setNewComment(true); }}
                        sx={{
                          color: '#2B283A', borderColor: '#2B283A', '&:hover':
                            { color: '#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB' }
                        }}>
                        Post
                      </Button>
                    </div>
                    {/* COMMENTS */}
                    <ul style={{ listStyle: 'none', margin: 0 }}>
                      {comments && comments.map((navcomments) => {
                        const { id, user, body, created } = navcomments;
                        return (
                          <div key={id}>
                            <li style={{ color: "#6B7280" }}>
                              {user} {moment(created).utc().format('YYYY-MM-DD')}
                              {Auth.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
                                <IconButton onClick={() => { deleteComment(id); setComments(comments.filter(x => x.id !== id)) }}>
                                  <DeleteIcon sx={{ '&:hover': { cursor: 'pointer' }, fontSize: 18 }} />
                                </IconButton>}
                            </li>
                            <li>
                              {body}
                            </li>
                            <hr></hr>
                          </div>)
                      })}
                    </ul>
                  </Box>
                </div>
              </div> :
              <div>
                <Typography>
                  Please Select a Ticket
                </Typography>
              </div>}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

export default SelectedProject;
