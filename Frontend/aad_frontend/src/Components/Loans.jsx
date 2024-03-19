import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../Styles/Loans.css';
import LoanDetails from './LoanDetails';
import axios from 'axios';

function Loans() {
  const [userLoans, setUserLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/loans/d/${userId}`);
        const loans = response.data;
  console.log(loans)
        const loansWithBankNames = await Promise.all(loans.map(async loan => {
          const bankName = await fetchBankName(loan.bankid); 
          return { ...loan, bank: bankName };
        }));
        console.log(loansWithBankNames)
  
        setUserLoans(loansWithBankNames);
      } catch (error) {
        console.error('Error fetching user loans:', error);
      }
    };
  
    fetchUserLoans();
  }, []);
  

  const fetchBankName = async (bankId) => {
    try {
      const response = await axios.get(`http://localhost:8080/bank/${bankId}`); 
      console.log(response.data)
      return response.data.name;
    } catch (error) {
      console.error('Error fetching bank name:', error);
      return '';
    }
  };

  const handleViewDetails = async (loan) => {
    const bankName = await fetchBankName(loan.bankId);
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handlePay = (loan) => {
    alert(`Paid due amount of ${loan.dueAmount}`);
  };

  return (
    <div className='loans-container'>
      <Sidebar />
      <div className='loans-content'>
        <h2>Submitted Loan Applications</h2>
        <table className='application-table'>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Status</th>
              <th>Full Name</th>
              <th>Amount</th>
              <th>Bank</th>
              <th>Application Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userLoans.map(application => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.status}</td>
                <td>{application.fullName}</td>
                <td>{application.amount}</td>
                <td>{application.bank}</td>
                <td>{application.applicationDate}</td>
                <td>
                  <button onClick={() => handleViewDetails(application)} className='view-button'>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <LoanDetails isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} loan={selectedLoan} />
        
        <div className='button-container'>
          <Link to="/loan-list" className='new-application-button'>New Application</Link>
          <Link to="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" target='blank' className='loan-requirements-button'>Apply For new PAN</Link>
        </div>
      </div>
    </div>
  );
}

export default Loans;
