import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import React, { ReactNode } from 'react';

const Layout: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default Layout;
