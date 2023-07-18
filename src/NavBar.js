import React from 'react';



function NavBar({username, onLogout}) {
  return (
    <div style={{ backgroundColor: 'grey', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: 'white', fontWeight: 'bold' }}>Hello, {username}</span>
        <button style={{ backgroundColor: 'silver', color: 'Black', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default NavBar;
