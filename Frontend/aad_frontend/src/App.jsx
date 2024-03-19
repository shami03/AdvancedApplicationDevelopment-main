import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './Components/Home';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import UserDashboard from './Components/UserDashboard';
import LoadingIndicator from './Components/LoadingIndicator';
import Navbar from './Components/Navbar';
import LoanCalculator from './Components/LoanCalculator';
import AdminDashboard from './Components/Admin/AdminDashboard';
import UsersPage from './Components/Admin/UsersPage';
import BanksPage from './Components/Admin/BanksPage';
import SchemesPage from './Components/Admin/SchemesPage';
import LoansPage from './Components/Admin/LoansPage';
import AgriLoanFAQ from './Components/AgriLoanFaq';

const Loans = React.lazy(() => import('./Components/Loans'));
const NewApplication = React.lazy(() => import('./Components/NewApplication'));
const Documents = React.lazy(() => import('./Components/Documents'));
const ProfilePage = React.lazy(() => import('./Components/ProfilePage'));
const LoanExplorer = React.lazy(() => import('./Components/LoanList'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingIndicator />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/new-application/:bankid/:schemeId" element={<NewApplication />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/loan-list" element={<LoanExplorer />} /> 
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/banks" element={<BanksPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/all-loans" element={<LoansPage />} />
          <Route path="/faq" element={<AgriLoanFAQ />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
