import React from 'react';
import { Container, Box } from '@mui/material';

const HorizontalDivider = () => {
  return (
    <Container sx={{padding: '25px'}}>
    <Box style={styles.fadeRule} ></Box>
    </Container>
  )
};

const styles = {
  fadeRule: {
    height: '1px',
    backgroundColor: '#E6E6E6',
    width: '66.0em',
    margin: '0 auto',
    backgroundImage: 'linear-gradient(left , white 2%, #E6E6E6 50%, white 98%)',
    backgroundImage: '-o-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%)',
    backgroundImage: '-moz-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%)',
    backgroundImage: '-webkit-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%)',
    backgroundImage:'-ms-linear-gradient(left , white 2%, #E6E6E6 50%, white 98%)',
    backgroundImage: '-webkit-gradient( linear, left bottom, right bottom, color-stop(0.02, white), color-stop(0.5, gray), color-stop(0.98, white) )',
  }
};

export default HorizontalDivider;