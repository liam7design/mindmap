import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

// 카드 데이터
const cards = [
 {
    id: 1,
    title: '로또번호 생성기',
    description: '복잡한 고민 없이, 단 한 번의 클릭으로 나만의 행운의 로또번호를 쉽고 빠르게 만들어보세요! 당첨의 기회를 지금 바로 경험해보세요.',
    link: '/lotto'
  },
  {
    id: 2,
    title: '스트레스 진단 테스트',
    description: '최근 내 스트레스 원인, 강도, 해소 방법을 마인드맵으로 정리해보고, 맞춤형 관리 팁을 제공합니다.',
    link: '/lotto'
  },
  {
    id: 3,
    title: '목표 달성 스타일 테스트',
    description: '목표 설정 및 달성 과정에서의 내 행동 패턴과 장애 요인을 마인드맵으로 분석해줍니다.',
    link: '/lotto'
  },
  {
    id: 4,
    title: '대인관계 유형 테스트',
    description: '친구, 가족, 동료 등 관계별 내 상호작용 방식을 마인드맵으로 시각화하여 관계 개선 포인트를 제안합니다.',
    link: '/lotto'
  },
  {
    id: 5,
    title: '감정 인식 능력 테스트',
    description: '내 감정의 종류와 빈도, 감정 조절 방법을 마인드맵으로 정리하고, 감정 관리 팁을 제공합니다.',
    link: '/lotto'
  },
  {
    id: 6,
    title: '의사결정 스타일 테스트',
    description: '중요한 선택 상황에서의 내 사고방식, 우선순위, 망설임 요인을 마인드맵으로 분석합니다.',
    link: '/lotto'
  },
  {
    id: 7,
    title: '자기동기부여 테스트',
    description: '나를 움직이게 하는 내적·외적 동기를 마인드맵으로 시각화하고, 동기부여 전략을 안내합니다.',
    link: '/lotto'
  },
  {
    id: 8,
    title: '창의성 진단 테스트',
    description: '문제 해결, 아이디어 발상, 새로운 시도 등 창의적 사고의 강점과 약점을 마인드맵으로 보여줍니다.',
    link: '/lotto'
  },
  {
    id: 9,
    title: '시간 관리 습관 테스트',
    description: '내 하루 루틴과 시간 사용 패턴을 마인드맵으로 분석해, 효율적인 시간 관리법을 제안합니다.',
    link: '/lotto'
  },
  {
    id: 10,
    title: '자기이해 심화 테스트',
    description: '내 가치관, 신념, 삶의 목표 등 자기이해도를 마인드맵으로 정리하고, 자기성찰 가이드를 제공합니다.',
    link: '/lotto'
  },
 {
    id: 11,
    title: '나의 성격 유형 찾기 (MBTI 기반)',
    description: '16가지 성격 유형 중 내 성향을 마인드맵으로 시각화하며, 대인관계 및 직업적 강점도 함께 분석합니다.',
    link: '/lotto'
  },
];

// 배경색 배열
const bgColors = [
  '#899f6a', // Tendril
  '#7391c9', // Cornflower Blue
  '#a793b9', // Viola
  '#d19c97', // Rose Tan
  '#a47764', // Mocha Mousse
  '#a89a8f', // Cobblestone
  '#9a8b4e', // Willow
  '#f0e9e0', // Gardenia
]

// 연속 색상 중복 없이 랜덤 인덱스 생성
const getNonRepeatingRandomIndices = (length, colorCount) => {
  let lastIndex = -1;
  const indices = [];
  for (let i = 0; i < length; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * colorCount);
    } while (idx === lastIndex);
    indices.push(idx);
    lastIndex = idx;
  }
  return indices;
};

const colorIndices = getNonRepeatingRandomIndices(cards.length, bgColors.length);

const Main = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#a47864' }}>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }, 
        }}
      >
        {cards.map((card, index) => {
          const bgColor = bgColors[colorIndices[index]];
          const textColor = bgColor === '#f0e9e0' ? '#726f67' : '#ffffff';
          return (
            <Card 
              key={card.id} 
              sx={{ 
                aspectRatio: '1 / 1',
                backgroundColor: bgColor,
                boxShadow: 'none',
                borderRadius: 0,
                color: textColor
              }}>
              <CardActionArea
                component={Link} 
                to={card.link}
                sx={{
                  padding: 2, 
                  height: '100%',
                  '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  },
                }}
              >
                <CardContent 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: 0
                  }}>
                  <Typography variant="h4" sx={{ fontWeight: 500, wordBreak: 'keep-all' }} gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'keep-all' }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Main;