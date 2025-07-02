// src/components/Ball.js
import React from 'react';
import { Box } from '@mui/material';

// 숫자에 따라 공의 배경색을 결정하는 함수
const getBallStyle = (num) => {
  let backgroundColor;
  if (num <= 10) {
    backgroundColor = '#FFD700'; // Gold, 노랑 계열
  } else if (num <= 20) {
    backgroundColor = '#1E90FF'; // Dodger Blue, 파랑 계열
  } else if (num <= 30) {
    backgroundColor = '#FF6347'; // Tomato, 빨강 계열
  } else if (num <= 40) {
    backgroundColor = '#808080'; // Gray, 회색 계열
  } else {
    backgroundColor = '#32CD32'; // Lime Green, 초록 계열
  }

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: { xs: 38, sm: 48 }, // 공 크기 약간 증가 (반응형)
    height: { xs: 38, sm: 48 },
    borderRadius: '50%',
    backgroundColor,
    color: 'white',
    fontSize: { xs: '1.1rem', sm: '1.4rem' }, // 폰트 크기 증가
    fontWeight: 'bold',
    // boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // 그림자를 더 은은하게
    boxShadow: '0 2px 5px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.4) inset', // 더 세련된 그림자
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)', // 글자 그림자 추가
  };
};

function Ball({ num }) {
  return <Box sx={getBallStyle(num)}>{num}</Box>;
}

export default Ball;
