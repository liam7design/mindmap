import React, { useRef, useLayoutEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

export const FloatingBox = ({ children, direction = 'row', ...props }) => {
  const fixedBoxRef = useRef(null);
  const [fixedHeight, setFixedHeight] = useState(76); // 기본값 76

  useLayoutEffect(() => {
    if (fixedBoxRef.current) {
      setFixedHeight(fixedBoxRef.current.offsetHeight);
    }
  }, [children, props.sx]); // children이나 sx가 바뀌면 다시 측정

  return (
    <>
      <Box sx={{ height: fixedHeight }} />
      <Box
        ref={fixedBoxRef}
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.paper',
          px: { xs: 2, sm: 3 },
          py: 2,
          zIndex: 999,
          ...props.sx
        }}
        {...props}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -24,
            height: 24,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))'
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: direction, alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export const FloatingButton = ({ variant, label, onClick, ...props }) => (
  <Button
    variant={variant || 'outlined'}
    size="large"
    onClick={onClick}
    fullWidth
    sx={{
      minWidth: 120,
      ...props.sx,
    }}
    {...props}
  >
    {label}
  </Button>
);