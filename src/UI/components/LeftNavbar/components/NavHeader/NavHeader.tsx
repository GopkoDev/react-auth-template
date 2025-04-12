import { JSX } from 'react';
import { ActivityIcon } from '../../../../../assets/icons';
import { Link } from 'react-router-dom';

export const NavHeader = (): JSX.Element => {
  return (
    <Link to="/">
      <div className="main_nav--header logo_header">
        <div className="main_nav--header--logo">
          <ActivityIcon />
        </div>
        <div className="main_nav--header--title">START TEMAPLATE</div>
      </div>
    </Link>
  );
};
