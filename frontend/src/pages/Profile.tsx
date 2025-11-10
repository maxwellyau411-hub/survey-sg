import { useEffect, useState } from 'react';
import { fetchProfile } from '../services/api';

interface UserProfile {
  name: string;
  email: string;
  agency: string;
  job_desc: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch(() => {
        alert('Please log in again');
        localStorage.removeItem('user');
        window.location.href = '/';
      });
  }, []);

  if (!profile) return <p>Loading...</p>;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Agency:</strong> {profile.agency}</p>
      <p><strong>Job Scope:</strong> {profile.job_desc}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
