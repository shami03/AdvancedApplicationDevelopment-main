import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TableSortLabel } from '@mui/material';
import axios from 'axios';

import Sidebar from '../Sidebar';
import './UserPage.css';

const BanksPage = () => {
  const [banks, setBanks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [openAddBankDialog, setOpenAddBankDialog] = useState(false);
  const [openEditBankDialog, setOpenEditBankDialog] = useState(false);
  const [editedBankData, setEditedBankData] = useState({
    id: '',
    name: '',
    username: '',
    password: ''
  });
  const [newBankData, setNewBankData] = useState({
    name: '',
    username: '',
    password: ''
  });
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bank/');
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
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

  const handleDeleteBank = async (bankId) => {
    if (window.confirm("Are you sure to delete the bank?")) {
      try {
        await axios.delete(`http://localhost:8080/bank/${bankId}`);
        const updatedBanks = banks.filter(bank => bank.id !== bankId);
        setBanks(updatedBanks);
      } catch (error) {
        console.error('Error deleting bank:', error);
      }
    }
  };

  const handleAddBank = async () => {
    try {
      await axios.post('http://localhost:8080/bank/', newBankData);
      setOpenAddBankDialog(false);
      setNewBankData({
        name: '',
        username: '',
        password: ''
      });
      const response = await axios.get('http://localhost:8080/bank/');
      setBanks(response.data);
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  };

  const handleEditBank = async () => {
    try {
      await axios.put(`http://localhost:8080/bank/${editedBankData.id}`, editedBankData);
      setOpenEditBankDialog(false);
      const response = await axios.get('http://localhost:8080/bank/');
      setBanks(response.data);
    } catch (error) {
      console.error('Error editing bank:', error);
    }
  };

  const handleOpenAddBankDialog = () => {
    setOpenAddBankDialog(true);
  };

  const handleCloseAddBankDialog = () => {
    setOpenAddBankDialog(false);
  };

  const handleOpenEditBankDialog = (bank) => {
    setEditedBankData(bank);
    setOpenEditBankDialog(true);
  };

  const handleCloseEditBankDialog = () => {
    setOpenEditBankDialog(false);
  };

  const handleNewBankDataChange = (event) => {
    const { name, value } = event.target;
    setNewBankData({
      ...newBankData,
      [name]: value
    });
  };

  const handleEditedBankDataChange = (event) => {
    const { name, value } = event.target;
    setEditedBankData({
      ...editedBankData,
      [name]: value
    });
  };

  return (
    <div className='users-div'>
      <Sidebar />
      <div className='users-content' style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
        <Container maxWidth="lg" style={{minWidth:'100%', marginTop: '94px' }}>
          <Grid container spacing={3} style={{display:'flex',width:'100%'}}>
            <Grid item xs={12} style={{ marginBottom: '20px',display:'flex',justifyContent:'space-between' }}>
          <Typography variant="h4" style={{ marginTop:'30px',fontSize:'xx-large',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} gutterBottom>
            BANKS LIST
          </Typography>
              <Button  style={{maxHeight:'40px',marginTop:"30px ",fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="outlined" color="primary" onClick={handleOpenAddBankDialog}>
                Add Bank
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: '10px', minHeight: '300px' }}>
                <Table>
                  <TableHead>
                    <TableRow >
                      <TableCell >
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
                          active={orderBy === 'username'}
                          direction={orderBy === 'username' ? order : 'asc'}
                          onClick={handleSort('username')}
                        >
                          Username
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
                          active={orderBy === 'noOfSchemes'}
                          direction={orderBy === 'noOfSchemes' ? order : 'asc'}
                          onClick={handleSort('noOfSchemes')}
                        >
                          Total Schemes
                        </TableSortLabel>
                      </TableCell>
                      <TableCell style={{ textAlign:'justify',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Actions (Edit or Delete)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? banks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : banks
                    ).map(bank => (
                      <TableRow key={bank.id}>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{bank.name}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{bank.username}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{bank.schemes.length}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
                          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} color="error" onClick={() => handleDeleteBank(bank.id)}>Delete</Button>
                          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif', marginLeft: '10px' }} color="primary" onClick={() => handleOpenEditBankDialog(bank)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
                  count={banks.length}
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
      <Dialog open={openAddBankDialog} onClose={handleCloseAddBankDialog}>
        <DialogTitle style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Add Bank</DialogTitle>
        <DialogContent style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
          <TextField
            style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={newBankData.name}
            onChange={handleNewBankDataChange}
          />
          <TextField
            style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="username"
            name="username"
            label="Username"
            fullWidth
            value={newBankData.username}
            onChange={handleNewBankDataChange}
          />
          <TextField
            style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={newBankData.password}
            onChange={handleNewBankDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} onClick={handleCloseAddBankDialog}>Cancel</Button>
          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} onClick={handleAddBank} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditBankDialog} onClose={handleCloseEditBankDialog}>
        <DialogTitle style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Edit Bank</DialogTitle>
        <DialogContent style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
          <TextField
            style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={editedBankData.name}
            onChange={handleEditedBankDataChange}
          />
          <TextField
            style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="username"
            name="username"
            label="Username"
            fullWidth
            value={editedBankData.username}
            onChange={handleEditedBankDataChange}
          />
          <TextField
            style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={editedBankData.password}
            onChange={handleEditedBankDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} onClick={handleCloseEditBankDialog}>Cancel</Button>
          <Button style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} onClick={handleEditBank} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BanksPage;
