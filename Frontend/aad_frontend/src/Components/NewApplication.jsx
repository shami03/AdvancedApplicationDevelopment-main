import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../Styles/NewApplication.css';
import axios from 'axios';

function NewApplication() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    aadharNumber: '',
    panNumber: '',
    addressLine1: '',
    dob: '',
    amount: '',
    duration: '',
    loanType: '',
    collateralDetails: '',
    additionalDocument: '',
    cropType:'',
    landSize:'',
    requiredMachinery:'',
    agreeToTerms: false,
  });

  const { schemeId } = useParams();
  const { bankid } = useParams();
  const [interestRate, setInterestRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/userdetails/${userId}`);
        const userData = response.data;
        setFormData({
          ...formData,
          fullName: userData.fullName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          aadharNumber: userData.aadharNumber || '',
          panNumber: userData.panNumber || '',
          addressLine1: userData.addressLine1 || '',
          addressLine2: userData.addressLine2 || '',
          district: userData.district || '',
          city: userData.city || '',
          state: userData.state || '',
          dob: userData.dob || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchSchemeInterestRate = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bank-schemes/${schemeId}`);
        console.log(response);
        const schemeData = response.data;
        setInterestRate(schemeData.interestRate);
      } catch (error) {
        console.error('Error fetching scheme interest rate:', error);
      }
    };

    fetchSchemeInterestRate();
  }, [schemeId]); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

const nav=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const interest = interestRate / 100;
      const loanAmount = parseFloat(formData.amount);
      const duration = parseInt(formData.duration);
      const monthlyInterest = interest / 12;
      const numPayments = duration * 12;
      console.log(numPayments)
      console.log(monthlyInterest)
      const numerator = monthlyInterest * Math.pow(1 + monthlyInterest, numPayments);
      const denominator = Math.pow(1 + monthlyInterest, numPayments) - 1;
  
      const monthlyPayment = (loanAmount * (numerator / denominator)).toFixed(2);
      setMonthlyPayment(monthlyPayment);
      const response = await axios.post('http://localhost:8080/api/loans', {
        userId: localStorage.getItem('userId'),
        schemeId: schemeId,
        fullName: formData.fullName,
        applicationDate: new Date(),
        cropType: formData.cropType,
        landSize: formData.landSize,
        loanType: formData.loanType,
        amount: formData.amount,
        monthlyPayment:monthlyPayment,
        bankid:bankid,
        dueAmount: 0,
        requiredMachinery: formData.requiredMachinery,
        status: 'Pending',
      });
      nav('/documents')
      console.log('Application submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="new-application" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="new-app" style={{ flex: 1, padding: '20px' }}>
        <h1>New Application</h1>
        <form className="new-form" onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '48%' }}>
              <h2>Personal Information</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Full Name:</td>
                    <td>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Phone Number:</td>
                    <td>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Address Line 1:</td>
                    <td>
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date of Birth:</td>
                    <td>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Aadhar Number:</td>
                    <td>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>PAN Number:</td>
                    <td>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ width: '48%' }}>
              <table>
                <tbody>
                  <h2>Loan Details</h2>
                  <tr>
                    <td>Loan Amount:</td>
                    <td>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Loan Duration (months):</td>
                    <td>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Loan Type:</td>
                    <td>
                      <select
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Loan Type</option>
                        <option value="crop">Crop Loan</option>
                        <option value="land">Land Loan</option>
                        <option value="equipment">Equipment Loan</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Collateral Details:</td>
                    <td>
                      <textarea
                        name="collateralDetails"
                        value={formData.collateralDetails}
                        onChange={handleChange}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>Crop Type:</td>
                    <td>
                      <input
                        type="text"
                        name="cropType"
                        value={formData.cropType}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Land Size:</td>
                    <td>
                      <input
                        type="text"
                        name="landSize"
                        value={formData.landSize}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Required Machinery:</td>
                    <td>
                      <input
                        type="text"
                        name="requiredMachinery"
                        value={formData.requiredMachinery}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
                  <tr>
            <td>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
            </td>
            <td>Agree to Terms and Conditions:</td>
          </tr>
          <button type="submit">Submit Application</button>
            </div>
          </div>
        
        </form>
      </div>
    </div>
  );
}

export default NewApplication;
