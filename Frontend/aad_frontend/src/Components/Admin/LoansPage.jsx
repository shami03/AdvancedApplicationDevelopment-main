import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

import Sidebar from '../Sidebar';
import './UserPage.css';

const LoansPage = () => {
    const [loans, setLoans] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openApproveDialog, setOpenApproveDialog] = useState(false);
    const [openDenyDialog, setOpenDenyDialog] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState('');
  
    useEffect(() => {
      const fetchLoans = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/loans');
          setLoans(response.data);
        } catch (error) {
          console.error('Error fetching loans:', error);
        }
      };
  
      fetchLoans();
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleApproveLoan = async () => {
      try {
        await axios.put(`http://localhost:8080/api/loans/${selectedLoanId}/approve`);
        const updatedLoans = loans.map(loan => {
          if (loan.id === selectedLoanId) {
            return { ...loan, status: 'Approved' };
          }
          return loan;
        });
        setLoans(updatedLoans);
        setOpenApproveDialog(false);
      } catch (error) {
        console.error('Error approving loan:', error);
      }
    };
  
    const handleDenyLoan = async () => {
      try {
        await axios.put(`http://localhost:8080/api/loans/${selectedLoanId}/deny`);
        const updatedLoans = loans.map(loan => {
          if (loan.id === selectedLoanId) {
            return { ...loan, status: 'Denied' };
          }
          return loan;
        });
        setLoans(updatedLoans);
        setOpenDenyDialog(false);
      } catch (error) {
        console.error('Error denying loan:', error);
      }
    };
  
    const handleOpenApproveDialog = (loanId) => {
      setSelectedLoanId(loanId);
      setOpenApproveDialog(true);
    };
  
    const handleOpenDenyDialog = (loanId) => {
      setSelectedLoanId(loanId);
      setOpenDenyDialog(true);
    };
  
    const handleCloseApproveDialog = () => {
      setOpenApproveDialog(false);
    };
  
    const handleCloseDenyDialog = () => {
      setOpenDenyDialog(false);
    };
  

  return (
    <div className='users-div'>
      <Sidebar />
      <div className='users-content'>
        <Container maxWidth="lg" style={{ minWidth:'100%',marginTop: '70px' }}>
          <Grid container spacing={3} style={{marginTop:'50px'}}>
            <Grid item xs={12}>
          <Typography variant="h4" style={{ fontSize:'30px',paddingBottom:'10px',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }} gutterBottom>
            LOANS LIST
          </Typography>
              <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Loan ID</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>User ID</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Status</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Scheme ID</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Full Name</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Loan Type</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Amount</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Application Date</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Monthly Payment</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Crop Type</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Land Size</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Required Machinery</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Due Amount</TableCell>
                      <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? loans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : loans
                    ).map(loan => (
                      <TableRow key={loan.id}>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.id}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.userId}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.schemeId}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.status}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.fullName}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.loanType}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.amount}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.applicationDate}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.monthlyPayment}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.cropType}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.landSize}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.requiredMachinery}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>{loan.dueAmount}</TableCell>
                        <TableCell style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
  {loan.status === 'Pending' ? (
    <>
      <Button onClick={() => handleOpenApproveDialog(loan.id)} style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Approve</Button>
      <Button onClick={() => handleOpenDenyDialog(loan.id)} style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Deny</Button>
    </>
  ) : loan.status === 'Denied' ? (
    <Typography variant="body2" style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Denied</Typography>
  ) : (
    <Typography variant="body2" style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>Already Approved</Typography>
  )}
</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={loans.length}
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
      <Dialog open={openApproveDialog} onClose={handleCloseApproveDialog}>
        <DialogTitle>Approve Loan</DialogTitle>
        <DialogContent>
          Are you sure you want to approve this loan?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApproveDialog}>Cancel</Button>
          <Button onClick={handleApproveLoan} color="primary">Approve</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDenyDialog} onClose={handleCloseDenyDialog}>
        <DialogTitle>Deny Loan</DialogTitle>
        <DialogContent>
          Are you sure you want to deny this loan?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDenyDialog}>Cancel</Button>
          <Button onClick={handleDenyLoan} color="primary">Deny</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoansPage;
