import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!identifier || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: identifier,
        password: password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred during login');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <h1 className="login-title">login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLoginClick}>
        <input 
          type="text" 
          placeholder="username or email" 
          className="login-input" 
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          disabled={isLoading}
        />
        <input 
          type="password" 
          placeholder="password" 
          className="login-input" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="login-button" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'login'}
        </button>
      </form>
      <p className="signup-text">
        don't have an account? 
        <span className="signup-link" onClick={handleSignUpClick}>create one</span>
      </p>
    </div>
  );
}

export default LoginPage;