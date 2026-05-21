import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password
        }
      );

      localStorage.setItem('token', res.data.token);

      navigate('/dashboard');
    } catch (err) {
      alert('Login Failed');
    }
  };

  return (
    <div className='container mt-5'>
      <h2>CRM Login</h2>

      <input
        className='form-control mb-3'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        className='form-control mb-3'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='btn btn-primary' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;