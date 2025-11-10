
export const loginWithGovaa = async (email: string, password: string) => {
  const res = await fetch('http://localhost:3000/auth/govaa-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error('Login failed');
  const { token } = await res.json();
  localStorage.setItem('token', token);
};
