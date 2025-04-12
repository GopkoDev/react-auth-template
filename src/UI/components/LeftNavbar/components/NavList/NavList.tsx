import { JSX } from 'react';
import { navRoutes } from '../../../../../data/nav-routes';
import { Link, useLocation } from 'react-router-dom';

export const NavList = (): JSX.Element => {
  const location = useLocation();

  return (
    <ul className="main_nav--list">
      {navRoutes.map((route) => {
        const isActive =
          (route.path === '/' && location.pathname === '/') ||
          (location.pathname.includes('settings') &&
            route.path.includes('settings'));

        return (
          <li key={route.path}>
            <Link
              to={route.path}
              key={route.path}
              className={`main_nav--list--item ${isActive ? 'active' : ''}`}
            >
              <route.icon
                color={`${
                  isActive ? 'var(--primary_border_color)' : 'var(--icon_color)'
                }`}
              />
              <span className="main_nav--list--label">{route.Label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
