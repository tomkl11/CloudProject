import React, { useState } from 'react';

const Register = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Registration successful! You can now login.');
        setTimeout(onBackToLogin, 2000);
      } else {
        setMessage('Error during registration.');
      }
    } catch (err) {
      setMessage('Server error.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required style={{width:'100%', marginBottom:'10px'}} />
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required style={{width:'100%', marginBottom:'10px'}} />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required style={{width:'100%', marginBottom:'10px'}} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#003366', color: 'white' }}>Register</button>
      </form>
      <p style={{ color: 'green' }}>{message}</p>
      <button onClick={onBackToLogin} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
        Back to Login
      </button>
    </div>
  );
};

export default Register;