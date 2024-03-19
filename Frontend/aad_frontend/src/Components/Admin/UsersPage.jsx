import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TableSortLabel } from '@mui/material';
import axios from 'axios';

import Sidebar from '../Sidebar';
import './UserPage.css'
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [filter, setFilter] = useState('');
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [newUserData, setNewUserData] = useState({
    role: '',
    email: '',
    password: '',
    name:''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleDeleteUser = async (userId) => {
    if(window.confirm("Are you sure to Delete a user")){
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
}
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/users', newUserData);
      setOpenAddUserDialog(false);
      setNewUserData({
        role: '',
        name:'',
        email: '',
        password: ''
      });
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  const handleNewUserDataChange = (event) => {
    const { name, value } = event.target;
    setNewUserData({
      ...newUserData,
      [name]: value
    });
  };

  const filteredUsers = users.filter(user => {
    if (filter === '') return true;
    return user.role === filter;
  });

  return (
    <div className='users-div'>
      <Sidebar />
      <div className='users-content' style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
        <Container maxWidth="lg" style={{ minWidth:'100%',marginTop: '94px' }}>
          <Grid container spacing={3} style={{display:'flex',width:'100%'}}>
            <Grid item xs={12} style={{ marginBottom: '20px',display:'flex',justifyContent:'space-between' }}>
          <Typography   variant="h4" style={{ marginTop:'30px',fontSize:'xx-large',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} gutterBottom>
            USERS LIST
          </Typography>
              <Button  style={{float:'right',marginLeft:'90px',marginTop:'30px',maxHeight:'40px',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="outlined" color="primary" onClick={handleOpenAddUserDialog}>
                Add User
              </Button>
              <FormControl variant="outlined" style={{float:'right',marginTop:'30px',padding:'0px', marginLeft: 'auto' }}>
                <InputLabel style={{float:'right',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} id="filter-label">Filter</InputLabel>
                <Select 
                  style={{minWidth:'100px',maxHeight:'50px', fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
                  labelId="filter-label"
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Filter"
                >
                  <MenuItem value="">
                    <em style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>All</em>
                  </MenuItem>
                  <MenuItem style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} value="admin">Admin</MenuItem>
                  <MenuItem style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} value="user">User</MenuItem>
                  <MenuItem style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} value="bank">Bank</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          
            <Grid item xs={12}>
                
              <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                <Table>
                  <TableHead>
                    
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'name'}
                          direction={orderBy === 'name' ? order : 'asc'}
                          onClick={handleSort('name')}
                          style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
                        >
                          Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
                          active={orderBy === 'email'}
                          direction={orderBy === 'email' ? order : 'asc'}
                          onClick={handleSort('email')}
                        >
                          Email
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                        style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
                          active={orderBy === 'role'}
                          direction={orderBy === 'role' ? order : 'asc'}
                          onClick={handleSort('role')}
                        >
                          Role
                        </TableSortLabel>
                      </TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Actions</TableCell>
                    </TableRow>
                    
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : filteredUsers
                    ).map(user => (
                      <TableRow key={user.id}>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{user.name}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{user.email}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{user.role}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
                          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} color="error" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
                  count={filteredUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Dialog open={openAddUserDialog} onClose={handleCloseAddUserDialog}>
        <DialogTitle style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Add User</DialogTitle>
        <DialogContent style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
        <FormControl>
      <InputLabel id="role-label">Role</InputLabel>
      <Select style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
        labelId="role-label"
        id="role"
        name="role"
        value={newUserData.role}
        onChange={handleNewUserDataChange}
      >
        <MenuItem style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} value="admin">Admin</MenuItem>
        <MenuItem style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} value="user">User</MenuItem>
        <MenuItem style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} value="bank">Bank</MenuItem>
      </Select>
    </FormControl>
          <TextField
          style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={newUserData.email}
            onChange={handleNewUserDataChange}
          />
          <TextField
          style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={newUserData.name}
            onChange={handleNewUserDataChange}
          />
          <TextField
          style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="password"
            name="password"
            label="Password"
            
            type="password"
            fullWidth
            value={newUserData.password}
            onChange={handleNewUserDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} onClick={handleCloseAddUserDialog}>Cancel</Button>
          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} onClick={handleAddUser} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
