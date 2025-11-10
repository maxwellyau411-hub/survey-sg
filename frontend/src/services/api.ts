const API_URL = 'http://localhost:3000/api';

const getAuthHeaders = () => ({
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  'Content-Type': 'application/json'
});

export const registerUser = async (data: {
  name: string;
  email: string;
  agency: string;
  jobDesc: string;
}) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Registration failed');
};

export const fetchProfile = async () => {
  const res = await fetch(`${API_URL}/profile`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error('Failed to load profile');
  return res.json();
};
