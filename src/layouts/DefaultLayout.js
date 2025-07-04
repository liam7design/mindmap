import React from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <Header title="🚀 행운의 로또 번호" customBackPath={() => navigate('/')} />
      <main>
        <Container sx={{
          padding: '57px 16px 24px',
          textAlign: 'left',
        }}>{children}</Container>
      </main>
    </>
  );
};

export default DefaultLayout;