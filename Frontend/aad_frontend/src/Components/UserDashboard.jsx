import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../Styles/userDash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AccountCircle, Email, Phone } from '@mui/icons-material';
import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart'; 

function UserDashboard() {
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const [userLoans, setUserLoans] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loansPerPage] = useState(5);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/userdetails/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserLoans = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/loans/d/${userId}`);
        setUserLoans(response.data);
      } catch (error) {
        console.error('Error fetching user loans:', error);
      }
    };

    if (!isLoggedIn) {
      alert("Please Login");
      nav('/login');
    } else {
      fetchUserData();
      fetchUserLoans();
    }
  }, [isLoggedIn, nav]);

  const navtoLoan = () => {
    nav('/loan-list');
  };
  const handleViewDetails = (loan) => {
    nav('/loans')
  };
  const LoanStatusPieChart = () => (
    <MUIPieChart
      series={[{ data: pieChartData }]}
      width={400}
      height={200}
    />
  );
  
  // Pagination
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = userLoans.slice(indexOfFirstLoan, indexOfLastLoan);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total amount borrowed
  const totalAmountBorrowed = userLoans.reduce((acc, loan) => acc + loan.amount, 0);

  // Prepare data for MUI PieChart
  const paidLoans = userLoans.filter(loan => loan.status === 'Paid');
  const remainingLoans = userLoans.filter(loan => loan.status !== 'Paid');
  const pieChartData = [
    { title: 'Paid', value: paidLoans.length, color: '#4CAF50' },
    { title: 'Remaining', value: remainingLoans.length, color: '#f44336' },
  ];

  return (
    <div className='user-dash'>
      <Sidebar />
      <div className='user-dashboard'>
        <div className='top'>
          <h3 className='hello-user'>
            {user ? `Hello ${user.fullName}! 👋` : ''}
          </h3>
          <button className='new-loan-button' onClick={navtoLoan}>New Loan Application</button>
        </div>
        <div className='overview'>
          <div className='total'>
            <img src='https://thumbs.dreamstime.com/b/icon-loan-borrow-loan-253393673.jpg'/>
            <h3>Total Amount Borrowed</h3>
            <h4>${totalAmountBorrowed}</h4>
          </div>
          <div className='total'>
            <img src='https://cdn-icons-png.flaticon.com/512/314/314420.png'/>
            <h3>Total Number of Repayments Done</h3>
            <h4>{paidLoans.length}</h4>
          </div>
          <div className='total'>
            <img src='https://png.pngtree.com/png-vector/20190726/ourmid/pngtree-package-pending-icon-for-your-project-png-image_1599195.jpg'/>
            <h3>Total Number of Repayments Pending</h3>
            <h4>{paidLoans.length}</h4>
          </div>
          <div className='total'>
            <img src='https://png.pngtree.com/element_our/png/20181227/report-vector-icon-png_295013.jpg'/>
            <h3>Detailed Report</h3>
            <button className='detailed-report-button'>View Report</button>
          </div>
        </div>
          {/* <h2 className='user-details-head'>User Details</h2> */}
        <div className='user-details'>
          {/* <div className='profile-section'>
            <div className='profile-info'>
              <AccountCircle className='icon' />
              <strong>Full Name:</strong> {user ? user.fullName : ''}
            </div>
            <div className='profile-info'>
              <Email className='icon' />
              <strong>Email:</strong> {user ? user.email : ''}
            </div>
            <div className='profile-info'>
              <Phone className='icon' />
              <strong>Phone:</strong> {user ? user.phoneNumber : ''}
            </div>
          </div> */}
         <div className='flex'>

          <h2>Total Loans</h2>
        <div className='total-loans'>
          {currentLoans.map(loan => (
            <div className='user-loan' key={loan.id}>
              <div className='loan-details'>
                <h4>Loan ID: {loan.id}</h4>
                
                <h4>Status: {loan.status}</h4>
              </div>
              <div className='loan-details'>
                <h4>Loan Type: {loan.loanType}</h4>
                <h4>Amount: ${loan.amount}</h4>
              </div>
              <button className='view-details-button' onClick={() => handleViewDetails(loan)}>View Details</button>
            </div>
          ))}
</div>
          <div className='notification'>
            <h2>Notifications</h2>
            <ul>
              <li>Please update your Documents</li>
              <li>Please check your Profile</li>
              <li>Keep Tracking your Application</li>
            </ul>
          </div>
          <ul className='pagination'>
            {userLoans.length > loansPerPage &&
              [...Array(Math.ceil(userLoans.length / loansPerPage))].map((_, index) => (
                <li key={index} className='page-item'>
                  <button onClick={() => paginate(index + 1)} className='page-link'>
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
