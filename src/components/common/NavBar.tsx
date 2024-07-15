import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container} from '@mui/material';

const Navbar: React.FC = () => (
  <Container sx={{borderBottom: '1px solid #000'}}>
    <nav style={styles.navbar}>
      <NavLink to="/" style={isActive => ({
          fontWeight: isActive ? "bold": "regular",
          textDecoration: 'none',
          color: 'black',
          padding: '10px'
        })}>
        Home
      </NavLink>
      <NavLink to="/indicators" style={isActive => ({
          fontWeight: isActive ? "bold": "regular",
          textDecoration: 'none',
          color: 'black',
          padding: '10px'
        })}>
        Indicators
      </NavLink>
      <NavLink to="/dimensions" style={isActive => ({
          fontWeight: isActive ? "bold": "regular",
          textDecoration: 'none',
          color: 'black',
          padding: '10px'
        })}>
        Dimensions
      </NavLink>
    </nav>
  </Container>
);

const styles = {
  navbar: {
    padding: '10px',
    backgroundColor: '#fff',
    color: 'white',
  },
};

export default Navbar;
