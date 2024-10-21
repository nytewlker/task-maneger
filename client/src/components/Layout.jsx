import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header'; // Ensure you import the correct Header component

const Layout = ({ panel }) => {
  return (
    <div>
      <header>
        <Header panel={panel} /> {/* Pass panel prop if needed for navigation */}
      </header>
      <main>
        <Outlet /> {/* This will render the matched child route component */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
