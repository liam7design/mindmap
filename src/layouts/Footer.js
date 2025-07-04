import React from 'react';
import { Typography, styled } from '@mui/material';

const Copyright = styled(Typography)(({ theme }) => ({
  padding: '0.5rem',
  color: '#d0d0d0',
  fontSize: '0.75rem',
  borderTop: '0.063rem solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: (theme.vars || theme).palette.text.primary,
}));


const Footer = () => {
  return (
    <>
      <Copyright>@ 2025 LIAMLIMAPP Corp. All rights reserved.</Copyright>
    </>
  )
};

export default Footer;