import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../Styles/LoanList.css'
import axios from 'axios';

const LoanExplorer = () => {
  const [banks, setBanks] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoggedIn,setIsLoggedin]=useState(localStorage.getItem('isLoggedIn')==='true');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bank/');
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching bank schemes:', error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="loan-list" style={{ display: 'flex', marginTop: '70px' }}>
    {isLoggedIn ===true?  <Sidebar />:<></>}
      <div className="loan-explorer-container" style={{ flex: 1, padding: '20px' }}>
        <h1>Loan Explorer</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bank</TableCell>
                <TableCell>Scheme Name</TableCell>
                <TableCell>Interest Rate</TableCell>
                <TableCell>Maximum Loan Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Eligibility Criteria</TableCell>
                <TableCell>Apply Now</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {banks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bank, bankIndex) => (
                bank.schemes.map((scheme, schemeIndex) => (
                  <TableRow key={schemeIndex}>
                    <TableCell>{bank.name}</TableCell>
                    <TableCell>{scheme.schemeName}</TableCell>
                    <TableCell>{scheme.interestRate}</TableCell>
                    <TableCell>{scheme.maximumLoanAmount}</TableCell>
                    <TableCell>{scheme.description}</TableCell>
                    <TableCell>{scheme.eligibilityCriteria}</TableCell>
                    <TableCell>
                      <Link to={`/new-application/${bank.id}/${scheme.id}`}>Apply Now</Link>
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={banks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default LoanExplorer;
