// src/components/Ball.js
import React from 'react';
import { Box } from '@mui/material';

// 숫자에 따라 공의 배경색을 결정하는 함수
const getBallStyle = (num) => {
  let backgroundColor;
  if (num <= 10) {
    backgroundColor = '#899f6a'; // Tendril
  } else if (num <= 20) {
    backgroundColor = '#7391c9'; // Cornflower Blue
  } else if (num <= 30) {
    backgroundColor = '#a793b9'; // Viola
  } else if (num <= 40) {
    backgroundColor = '#a47764'; // Mocha Mousse
  } else {
    backgroundColor = '#9a8b4e'; // Willow
  }

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor,
    color: 'white',
    fontSize: '1rem', // 폰트 크기 증가
    fontWeight: 'bold',
    // boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // 그림자를 더 은은하게
    boxShadow: '0 2px 5px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1) inset', // 더 세련된 그림자
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // 글자 그림자 추가
  };
};

function Ball({ num }) {
  return <Box sx={getBallStyle(num)}>{num}</Box>;
}

export default Ball;
