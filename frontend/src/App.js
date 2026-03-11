import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  if (!user) {
    return isRegistering 
      ? <Register onBackToLogin={() => setIsRegistering(false)} />
      : <Login 
          onLoginSuccess={(userData) => setUser(userData)} 
          onGoToRegister={() => setIsRegistering(true)} 
        />;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #003366', paddingBottom: '10px' }}>
        <h1>SecureSup</h1>
        <div>
          <span>Connected as <strong>{user.name}</strong></span>
          <button onClick={() => setUser(null)} style={{ marginLeft: '15px' }}>Logout</button>
        </div>
      </header>
      {user.role === 'ADMIN' ? (
        <AdminDashboard user={user}/>
      ) : (
        <UserDashboard user={user}/>
      )}
    </div>
  );
}

export default App;