import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Login.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const nav=useNavigate();
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: '',
  });

  const validate = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!agree) {
      errors.agree = 'Please agree to the terms';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users', {
        name,
        email,
        password,
        isFilled:false,
        role:'user',
      });
      const response2=await axios.post('http://localhost:8080/api/userdetails',{
        id:response.data.id,
        fullName:response.data.name,
        email:response.data.email,

      })
      console.log(response2);
      console.log('Registration successful:', response.data);
      nav('/login')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('There was an issue with your registration. Please check your details and try again.');
      } else {
        console.error('Registration failed:', error.response.data.errors);
      }
    }
  };

  return (
    <body id="login-body">
      <div className="login-container">
        <div className="login-outer-container">
          <div className="login-content-container">
            <br />
            <br />
            <br />
            <br />
            <h2>REGISTER &#x2764;</h2>
            <form>
              <div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Name"
                  required
                />
                {formErrors.name && <p className="error">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  required
                />
                {formErrors.email && <p className="error">{formErrors.email}</p>}
              </div>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  minLength="8"
                  required
                />
                {formErrors.password && <p className="error">{formErrors.password}</p>}
              </div>
              <div>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
              </div>
              <div>
                <label className='check-text'>
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                  />
                  I agree to the terms
                </label>
                {formErrors.agree && <p className="error">{formErrors.agree}</p>}
              </div>
              <button onClick={validate} type="submit">Register</button>
            </form>

            <h3> Already have an account? <Link className="register-link" to="/login">Login</Link></h3>
          </div>
          <div className="login-image-container"></div>
        </div>
      </div>
    </body>
  );
}

export default RegisterPage;
