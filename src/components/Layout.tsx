import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Navigation from './Navigation';
import Footer from './Footer';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      
      <Container>
        { children }
      </Container>

      <Footer />
    </div>
  );
};

export default Layout;
