import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const AGENCIES = [
  "A*Star", "ACRA", "GovTech", "Defence Science & Tech Agency", "CPF", "Civil Aviation Authority of Singapore"
];

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Register() {
  const [contactEmail, setContactEmail] = useState('');
  const [agency, setAgency] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  }, []);

  useEffect(() => {
    if (!user.name) navigate('/');
    setContactEmail(user.email || '');
  }, [navigate, user.name, user.email]);

  const handleRegister = async () => {
    try {
      await registerUser({
        name: user.name,
        email: contactEmail,
        agency,
        jobDesc,
      });
      navigate('/profile');
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <p><strong>Name:</strong> {user.name}</p>

      <input
        placeholder="Contact Email"
        value={contactEmail}
        onChange={e => setContactEmail(e.target.value)}
      />
      {!isValidEmail(contactEmail) && contactEmail && (
        <p style={{ color: 'red' }}>Please enter a valid email.</p>
      )}

      <select value={agency} onChange={e => setAgency(e.target.value)}>
        <option value="">Select Agency</option>
        {AGENCIES.map(a => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <textarea
        placeholder="Job Description"
        value={jobDesc}
        onChange={e => setJobDesc(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={e => setAccepted(e.target.checked)}
        />
        Accept Terms
      </label>

      <button
        onClick={handleRegister}
        disabled={
          !accepted || !contactEmail || !isValidEmail(contactEmail) || !agency
        }
      >
        Register
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
