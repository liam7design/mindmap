// src/App.js
import React from 'react';
import RecommendNumber from '../../components/lotto/RecommendNumber';
import { CssBaseline, Container, Typography, Box, ThemeProvider, createTheme } from '@mui/material';

// 폰트 설정 (선택 사항: Google Fonts 사용)
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
// public/index.html <head> 태그 안에 위 링크를 추가하면 Noto Sans KR 폰트가 적용됩니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif', // Noto Sans KR 우선 적용, 없으면 기본 sans-serif
    h4: {
      fontWeight: 700, // 볼드
      fontSize: '2rem', // 기본보다 약간 크게
      color: '#3f51b5', // MUI primary color
    },
    h6: {
      fontWeight: 500, // 미디움 볼드
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '0.9rem',
      color: '#607d8b', // Lighten text color
    }
  },
  palette: {
    primary: {
      main: '#3f51b5', // Material Design Indigo
    },
    secondary: {
      main: '#ff4081', // Material Design Pink A400
    },
    background: {
      default: '#e8eaf6', // Light Indigo background
      paper: '#ffffff', // White for cards/boxes
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 버튼 둥근 모서리
          textTransform: 'none', // 대문자 변환 방지
          fontWeight: 600,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

function Lotto() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{
          minHeight: '100vh', // 최소 높이 뷰포트 전체
          backgroundColor: theme.palette.background.default, // 배경색 적용
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4, // 상하 패딩
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: { xs: 2, sm: 4 }, // 반응형 패딩
              borderRadius: 3, // 더 둥근 모서리
              backgroundColor: theme.palette.background.paper, // 흰색 카드 배경
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)', // 은은한 그림자
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // 너비 100%
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ mb: 1 }} // 마진 조정
            >
              🚀 행운의 로또 번호
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              당신의 소중한 번호를 지금 바로 확인하세요!
            </Typography>
            <RecommendNumber />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Lotto;