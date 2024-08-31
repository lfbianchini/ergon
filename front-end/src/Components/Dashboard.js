import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import fetchUserInfo from './api';

function logout() {
  localStorage.removeItem('token'); 
}

function Dashboard() {
  const [greeting, setGreeting] = useState('');
  const [files, setFiles] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('good morning');
    else if (hour < 18) setGreeting('good afternoon');
    else setGreeting('good evening');

    async function getUserInfo() {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setUsername(userInfo);
      } else {
        console.error('Failed to fetch user info');
        navigate('/login'); 
      }
    }
    getUserInfo();

    setFiles([
      { id: 1, name: 'math' },
      { id: 2, name: 'cs' },
      { id: 3, name: 'language' },
      { id: 4, name: 'history' },
      { id: 5, name: 'science' },
      { id: 6, name: 'art' },
    ]);
  }, [navigate]);

  const handleCreateFile = () => {
    console.log('new file');
  };

  const handleFileClick = (fileId) => {
    console.log(`file with id: ${fileId}`);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-item active">home</div>
        <div className="sidebar-item" onClick={handleSettingsClick}>settings</div>
        <div className="sidebar-item" onClick={handleLogout}>logout</div>
      </div>
      <div className="main-content">
        <h1 className="greeting">{greeting}, {username || 'user'}</h1>
        <div className="files-section">
          <h2>your spaces</h2>
          <button className="create-file-btn" onClick={handleCreateFile}>+ new file</button>
          <div className="file-list">
            {files.map(file => (
              <div key={file.id} className="file-item" onClick={() => handleFileClick(file.id)}>
                {file.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;