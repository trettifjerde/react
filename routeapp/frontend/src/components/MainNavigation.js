import { Form, NavLink, useLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  const isLoggedIn = useLoaderData();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
      <ul className={classes.list}>
          {! isLoggedIn && <li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          </li>}
          { isLoggedIn && <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>}
        </ul>
    </header>
  );
}

export default MainNavigation;