import axios from 'axios';

async function fetchUserInfo() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return null;
  }

  try {
    const response = await axios.get('http://localhost:3000/user/name', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

export default fetchUserInfo;