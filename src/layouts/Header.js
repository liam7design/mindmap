import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  minHeight: '56px !important',
  alignItems: 'center',
  borderBottom: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: (theme.vars || theme).palette.background.default,
  boxShadow: 0,
}));

const HeaderTitle = styled(Typography)({
  flexGrow: 1, 
  fontSize: '1.125rem', 
  fontWeight: '500',
});

const Header = ({
  title,
  customBackPath,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (customBackPath) {
      // navigate(customBackPath);
      customBackPath();
    } else {
      navigate(-1);
    }
  };

  return (
    <AppBar position="fixed" sx={{ boxShadow: 0, color: 'text.primary' }}>
      <StyledToolbar>
        <HeaderTitle variant="h2" sx={{ textAlign: 'left' }}>{title}</HeaderTitle>
        <IconButton edge="end" color="inherit" aria-label="close" onClick={handleBack}><CloseIcon /></IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;