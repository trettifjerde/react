import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request, params}) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup')
    throw json({message: 'Invalid mode'}, {status: 422});

  const form = await request.formData();
  const data = {
    email: form.get('email'),
    password: form.get('password')
  };


  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  });

  if (response.status === 422 || response.status === 401) return response;
  if (!response.ok) throw json({message: 'Failed to authenticate'}, {status: 500});

  const resData = await response.json();
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  console.log(expiration);
  localStorage.setItem('token', resData.token);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/events');
}