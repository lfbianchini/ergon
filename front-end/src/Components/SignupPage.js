import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred during signup');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <h1 className="signup-title">create an account</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSignupClick}>
        <input 
          type="text" 
          placeholder="username" 
          className="signup-input" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <input 
          type="email" 
          placeholder="email" 
          className="signup-input" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <input 
          type="password" 
          placeholder="password" 
          className="signup-input" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <input 
          type="password" 
          placeholder="confirm password" 
          className="signup-input" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="signup-button" 
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'sign up'}
        </button>
      </form>
      <p className="login-text">
        already have an account? 
        <span className="login-link" onClick={handleLoginClick}>login</span>
      </p>
    </div>
  );
}

export default SignupPage;