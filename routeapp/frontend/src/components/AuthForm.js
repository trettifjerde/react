import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get('mode') === 'signup';
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isSignUp ? 'Create a new user' : 'Log in'}</h1>
        { actionData && actionData.message && <p>{actionData.message}</p>}
        {actionData && actionData.errors && <ul>{ Object.values(actionData.errors).map(e => <li key={e}>{e}</li>)}</ul>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isSignUp ? 'login' : 'signup'}`}>{isSignUp ? 'Log in' : 'Create new user'}</Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
