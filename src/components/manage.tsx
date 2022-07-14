import { Dialog, DialogTitle, TextField, DialogActions, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { useEffect, useState } from 'react'
import { deleteUser, getAllUser, saveUser } from '../services/UserServices';
import User from '../types/user.type';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Manage(props) {
  const {users, setUsers} = props;
  const [u, setU] = useState<User>({
    name: '',
    email: ''
  });

  //NEW USER FORM
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getAllUser();
      setUsers(result.data);
    })();
  }, [newUser]);

  return (
    <div>
      {/* CREATE */}
      <div>
        <Dialog open={newUser} onClose={()=> setNewUser(false)}>
          <DialogTitle>Set up a New User</DialogTitle>
          <div>
            <form>
              <TextField id="name" label="name" variant="standard" value={u.name} onChange={(e) => setU({ ...u, name: e.target.value })} 
              sx={{margin: 1, '& .MuiInputRoot': {color: '#10B981'}}}/>
              <TextField id="email" label="email" variant="standard" value={u.email} onChange={(e) => setU({ ...u, email: e.target.value })} 
              sx={{margin: 1}}/>
            </form>
          </div>
          <DialogActions>
            <Button onClick={()=> setNewUser(false)}
            sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
            {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}}>
              Cancel
            </Button>
            <Button onClick={() => {
              setNewUser(false);
              saveUser(u);
            }}
            sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': 
            {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* TABLE */}
      <div className='center' style={{paddingTop: '10vh'}}>
      <TableContainer component={Paper} sx={{ width: '150vh', marginLeft: {xl: '25vh'}}} >
      <Table aria-label="simple table">
      <TableHead>
      <TableRow>
        <TableCell>
          Users
        </TableCell>
        <TableCell></TableCell>
        <TableCell align="right">
        <Button variant="outlined" sx={{color: '#2B283A', borderColor: '#2B283A', '&:hover': {color:'#2B283A', borderColor: '#2B283A', backgroundColor: '#D1D5DB'}}} 
        onClick={() => {
          setU({
            name: '',
            email: ''
          });
          setNewUser(true);
        }}>New User</Button>
        </TableCell>
        </TableRow>
      <TableRow sx={{backgroundColor: '#ECFDF5'}}>
        <TableCell>
          Name
        </TableCell>
        <TableCell align="right">
          Email
        </TableCell>
        <TableCell align="right">
          Delete
        </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {users && users.map((navusers) => {
      const { id, name, email } = navusers;
      return (
      <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right"><IconButton onClick={() => { deleteUser(id); setUsers(users.filter(x => x.id !== id)) }}><DeleteIcon/></IconButton></TableCell>

      </TableRow>);
        })}
      </TableBody>
      </Table>
     </TableContainer>
      </div>
    </div>
  )
}
