  import React, { useState, useEffect } from 'react';
  import { AppBar, Toolbar, Typography, CssBaseline, Container, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
  import { Chart } from 'react-google-charts';
  import axios from 'axios';
import Sidebar from '../Sidebar';
import './AdminDash.css'
  const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const loansResponse = await axios.get('http://localhost:8080/api/loans');
          const schemesResponse = await axios.get('http://localhost:8080/bank-schemes');
          const usersResponse = await axios.get('http://localhost:8080/api/users');
          const banksResponse = await axios.get('http://localhost:8080/bank/');

          setDashboardData({
            loans: loansResponse.data,
            schemes: schemesResponse.data,
            users: usersResponse.data,
            banks: banksResponse.data
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);
    const adminUsers = dashboardData?.users.filter(user => user.role === 'admin');
    const bankUsers = dashboardData?.users.filter(user => user.role === 'bank');

    return (
      <div className='admin-dash'>
      <Sidebar/>
      <div className='admin-dash-content'>
        <Container  maxWidth="lg" style={{minWidth:'86%', marginTop: '30px',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' ,marginLeft:'200px'}}>
          <Typography variant="h5" style={{marginBottom:'20px',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}  className='admin-heading' gutterBottom>
            Welcome to Admin Dashboard 👋
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} style={{ padding: '20px',fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif', minHeight: '150px' }}>
                <Typography variant="h6" style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} gutterBottom>
                  Total Users
                </Typography>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h4" gutterBottom>
                  {dashboardData?.users.length || 'Loading...'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} style={{ padding: '20px', minHeight: '150px' }}>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h6" gutterBottom>
                  Total Loans
                </Typography>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h4" gutterBottom>
                  {dashboardData?.loans.length || 'Loading...'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} style={{ padding: '20px', minHeight: '150px' }}>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}  variant="h6" gutterBottom>
                  Total Schemes
                </Typography>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h4" gutterBottom>
                  {dashboardData?.schemes.length || 'Loading...'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} style={{ padding: '20px', minHeight: '150px' }}>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h6" gutterBottom>
                  Total Banks
                </Typography>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h4" gutterBottom>
                  {dashboardData?.banks.length || 'Loading...'}
                </Typography>
              </Paper>
            </Grid>
            {/* Add charts */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h6" gutterBottom>
                  Loan Amount Sanctioned vs Repaid
                </Typography>
                <Chart
                  width={'100%'}
                  height={'100%'}
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Loan Type', 'Sanctioned', 'Repaid'],
                    ['Crop Loan', 10000, 5000],
                    ['Equipment Loan', 8000, 6000],
                    ['Land Loan', 12000, 8000],
                  ]}
                  options={{
                    chartArea: { width: '50%' },
                    hAxis: { title: 'Amount', minValue: 0 },
                    vAxis: { title: 'Loan Type' },
                    colors: ['#1976D2', '#FFC107'],
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
                <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h6" gutterBottom>
                  Bank Details
                </Typography>
                <Chart
                  width={'100%'}
                  height={'100%'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Bank', 'Amount'],
                    ['Bank A', 5000],
                    ['Bank B', 8000],
                    ['Bank C', 12000],
                  ]}
                  options={{
                    title: 'Bank Loan Distribution',
                    colors: ['#009688', '#FF5722', '#673AB7'],
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
              <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h6" gutterBottom>
                Admin Users
              </Typography>
              <Table  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>
                <TableHead>
                  <TableRow>
                    <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>Name</TableCell>
                    <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminUsers?.map(user => (
                    <TableRow key={user.id}>
                      <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>{user.name}</TableCell>
                      <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', minHeight: '300px' }}>
              <Typography  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}} variant="h6" gutterBottom>
                Bank Users
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>Name</TableCell>
                    <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankUsers?.map(user => (
                    <TableRow key={user.id}>
                      <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>{user.name}</TableCell>
                      <TableCell  style={{fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif'}}>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
            
          </Grid>
          
        </Container>
        </div>
      </div>
    );
  };

  export default AdminDashboard;
