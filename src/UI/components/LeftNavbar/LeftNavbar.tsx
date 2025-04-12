import { JSX } from 'react';
import './LeftNavbar.scss';
import { NavHeader } from './components/NavHeader/NavHeader';
import { NavList } from './components/NavList/NavList';
import { NavFooter } from './components/NavFooter/NavFooter';

export const LeftNavbar = (): JSX.Element => {
  return (
    <nav className="main_nav">
      <NavHeader />
      <NavList />
      <NavFooter />
    </nav>
  );
};
