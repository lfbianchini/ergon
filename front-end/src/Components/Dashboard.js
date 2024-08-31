import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
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

    parseFilesToArray();
  }, [navigate]);

  const parseFilesToArray = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/directory');
      const files = response.data;

      let id = 1;
      const spaces = files.map(file => ({
        id: id++, // Increment id for each file
        name: file.key.split('/').filter(Boolean).pop() // Extract the directory name
      }));

      setFiles(spaces);
    } catch (error) {
      console.error("Error fetching directories:", error);
    }
  };

  const handleCreateFile = async () => {
    try {
      const fileName = prompt("enter the name of the new space:");
      if (!fileName) return; 

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/user/directory',
        { name: fileName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setFiles(prevFiles => [
          ...prevFiles,
          { id: prevFiles.length + 1, name: fileName }
        ]);
        console.log('File created successfully');
      }
    } catch (error) {
      console.error("Error creating file:", error);
    }
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
