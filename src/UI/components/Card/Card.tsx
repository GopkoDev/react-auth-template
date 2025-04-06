import React, { JSX } from 'react';
import './Card.scss';

export interface CardProps {
  width?: string;
  children: React.ReactNode;
}

const Card = ({ children, width = '100%' }: CardProps): JSX.Element => {
  return (
    <div style={{ width: width }} className="card">
      {children}
    </div>
  );
};

const Header = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className="card--header">{children}</div>;
};

const Body = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className="card--body">{children}</div>;
};

const Footer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <div className="card--footer">{children}</div>;
};

const Title = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <h2 className="card--title">{children}</h2>;
};

const Subtitle = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <h3 className="card--subtitle">{children}</h3>;
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
Card.Title = Title;
Card.Subtitle = Subtitle;

export { Card };
