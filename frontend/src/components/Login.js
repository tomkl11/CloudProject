import React, { useState } from 'react';

const Login = ({ onLoginSuccess, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); 
      if (response.ok) {
        onLoginSuccess(data.user); 
      } else {
        setError(data.error || 'Identifiants invalides');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
      <h2>Connexion SecureSup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br/>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </div>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#003366', color: 'white', border: 'none', cursor: 'pointer' }}>
          Connect
        </button>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          Not yet registered?{' '}
          <span 
            onClick={onGoToRegister} 
            style={{ color: '#003366', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;