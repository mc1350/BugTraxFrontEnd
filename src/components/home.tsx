import { useState } from 'react'
import { deleteProject, findProjectById, getAllProject, saveProject, updateProject } from '../services/ProjectServices'
import { useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Home(props) {
  //DESTRUCTURE PROPS
  let navigate = useNavigate();
  const {projects, setProjects} = props;
  const {projectIndex, setProjectIndex} = props;
  const {p, setP} = props; 
  const {user} = useAuth0();

  //STATE FOR MODALS
  const [newProject, setNewProject] = useState(false);
  const [editProject, setEditProject] = useState(false);  

  //GET PROJECTS
  useEffect(() => {
    (async () => {
      const result = await getAllProject();
      setProjects(result.data);
    })();
  }, [newProject, editProject]);

 
  return (
    <div className="home">
      {/* CREATE */}
      <div>
        <Dialog open={newProject} onClose={()=> setNewProject(false)}>
          <DialogTitle>Create a New Project</DialogTitle>
          <div>
            <form>
              <TextField id="title" label="title" variant="standard" value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} 
              sx={{margin: 1, '& .MuiInputRoot': {color: '#10B981'}}}/>
              <TextField id="description" label="description" variant="standard" value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} 
              sx={{margin: 1}}/>
            </form>
          </div>
          <DialogActions>
            <Button onClick={()=> setNewProject(false)}
            sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
            {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}}>
              Cancel
            </Button>
            <Button onClick={() => {
              setNewProject(false);
              saveProject(p);
            }}
            sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
            {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* EDIT */}
      <div>
      <Dialog open={editProject} onClose={()=> setEditProject(false)}>
      <DialogTitle>Edit {p.title}</DialogTitle>
      <div>
            <form >
              <TextField sx={{margin: 1, '& .MuiInputRoot': {color: '#10B981'}}}
              id="title" label="title" variant="outlined" value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} />
              <TextField sx={{margin: 1, '& .MuiInputRoot': {color: '#10B981'}}}
               id="description" label="description" variant="outlined" value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} />
            </form>
          </div>
         <DialogActions>
            <Button onClick={()=> setEditProject(false)} 
            sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
            {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}}>
              Cancel
            </Button>
            <Button onClick={() => {
              setEditProject(false);
              updateProject(p.id, p);
            }}
            sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
            {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}}>
            Submit
            </Button>
          </DialogActions>
      </Dialog>
      </div>
      {/* PROJECT LIST */}
      <div className='center' style={{marginTop: '10vh'}}>
      <TableContainer component={Paper} sx={{ width: '150vh', marginLeft: {xl: '25vh'}}} >
      <Table aria-label="simple table">
      <TableHead>
      <TableRow>
        <TableCell>
          Projects
        </TableCell>
        <TableCell></TableCell>
        { user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
        <TableCell align="right">
        <Button variant="outlined" sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}} onClick={() => {
          setP({
            title: '',
            description: ''
          });
          setNewProject(true);
        }}>New Project</Button>
        </TableCell>}
      </TableRow>
      <TableRow sx={{backgroundColor: '#ECFDF5'}}>
        <TableCell>
          Title
        </TableCell>
        <TableCell align="right">
          Description
        </TableCell>
        { user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
        <TableCell align="right">
          Edit | Delete
        </TableCell>}
       </TableRow>
      </TableHead>
      <TableBody>
    {projects && projects.map((navprojects) => {
      const { id, title, description } = navprojects;
      return (
        <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
            <TableCell component="th" scope="row" style={{cursor: 'pointer'}} onClick={() => {navigate(`/project/${id}`); setProjectIndex(id); setP(navprojects)}}>
                {title}
              </TableCell>
              <TableCell align="right">{description}</TableCell>
              { user.sub === "auth0|62b81b203ef05cf3b8d95d94" &&
              <TableCell align="right"><IconButton aria-label="EditIcon" onClick={()=> {setP(navprojects); setEditProject(true);}}><EditIcon/></IconButton> <IconButton onClick={() => { deleteProject(id); setProjects(projects.filter(x => x.id !== id)) }}><DeleteIcon/></IconButton></TableCell>}
      </TableRow>);
        })}
   </TableBody>
     </Table>
     </TableContainer>
     </div>
    </div>
  );
}
export default Home