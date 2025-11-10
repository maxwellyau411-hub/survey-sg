export async function loginGovaa(email: string, password: string) {
  const res = await fetch('http://localhost:3000/auth/govaa-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("GOVAA Login failed");
  return res.json();
}
