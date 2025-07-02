// src/components/RecommendNumber.js
import React, { useState, useCallback, useEffect } from 'react';
import Ball from './Ball';
import { Button, Box, Typography, Tabs, Tab, TextField, useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { getLuckyNumbersFromSaju } from '../../utils/lotto/sajuUtils'; // 사주 분석 유틸리티 import

// --- 유틸리티 함수들 ---

// 기본 로또 번호 1세트 생성 (당첨번호 6개만)
function generateLottoSet(excludeNumbers = []) {
  const fullPool = Array(45).fill().map((_, i) => i + 1);
  const candidatePool = fullPool.filter(num => !excludeNumbers.includes(num));
  const shuffle = [];
  while (candidatePool.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidatePool.length);
    shuffle.push(candidatePool.splice(randomIndex, 1)[0]);
  }
  const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return winNumbers;
}

// 고정 번호를 포함한 로또 번호 1세트 생성 (당첨번호 6개만)
function generateLottoSetWithFixedNumbers(fixedNumbers = []) {
  const remainingCount = 6 - fixedNumbers.length;
  const fullPool = Array(45).fill().map((_, i) => i + 1);
  const candidatePool = fullPool.filter(num => !fixedNumbers.includes(num));
  const shuffle = [];
  while (candidatePool.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidatePool.length);
    shuffle.push(candidatePool.splice(randomIndex, 1)[0]);
  }
  const randomPicks = shuffle.slice(0, remainingCount);
  const winNumbers = [...fixedNumbers, ...randomPicks].sort((a, b) => a - b);
  return winNumbers;
}


// --- 메인 컴포넌트 ---

function RecommendNumber() {
  const [lottoSets, setLottoSets] = useState([]);
  const [mode, setMode] = useState(0); // 0: 기본, 1: 사주, 2: 번호 포함
  const [userInfo, setUserInfo] = useState({ name: '', dob: '' });
  const [fixedNumbersInput, setFixedNumbersInput] = useState('');
  const [error, setError] = useState('');
  const [sajuInfo, setSajuInfo] = useState(''); // 사주 분석 결과 메시지 상태
  const theme = useTheme();

  // 최초 로딩 시 기본 번호를 생성하여 보여주는 것이 사용자 경험에 좋습니다.
  useEffect(() => {
    handleGenerate();
  }, []); // 의존성 배열이 비어있어 컴포넌트 마운트 시 1회만 실행됩니다.

  const handleTabChange = (event, newValue) => {
    setMode(newValue);
    setLottoSets([]); // 탭을 바꿀 때마다 결과 리스트를 초기화합니다.
    setError('');
    setSajuInfo('');
    setUserInfo({ name: '', dob: '' });
    setFixedNumbersInput('');
  };

  const handleGenerate = useCallback(() => {
    setError('');
    setSajuInfo('');
    let newSets = [];

    try {
      if (mode === 0) { // 기본 모드
        newSets = Array(5).fill(null).map(() => generateLottoSet());
      } 
      else if (mode === 1) { // 사주/성명학 모드
        if (!userInfo.name || !userInfo.dob) {
          throw new Error('이름과 생년월일을 모두 입력해주세요.');
        }

        const { luckyNumbers, message } = getLuckyNumbersFromSaju(userInfo.dob);
        setSajuInfo(message);

        if (luckyNumbers.length === 0) {
          throw new Error('사주 분석에 실패했습니다. 생년월일을 다시 확인해주세요.');
        }

        newSets = Array(5).fill(null).map(() => {
          const fixedNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)];
          return generateLottoSetWithFixedNumbers([fixedNumber]);
        });

      } 
      else if (mode === 2) { // 번호 포함 모드
        const parsedNumbers = fixedNumbersInput.split(',')
          .map(s => s.trim()).filter(s => s).map(Number);
        
        if (parsedNumbers.length === 0 || parsedNumbers.length > 5) {
          throw new Error('포함할 번호는 1개에서 5개까지 입력해야 합니다.');
        }
        if (new Set(parsedNumbers).size !== parsedNumbers.length) {
          throw new Error('중복된 번호를 입력할 수 없습니다.');
        }
        if (parsedNumbers.some(n => isNaN(n) || n < 1 || n > 45)) {
          throw new Error('1부터 45 사이의 숫자만 입력해주세요.');
        }

        newSets = Array(5).fill(null).map(() => generateLottoSetWithFixedNumbers(parsedNumbers));
      }
      setLottoSets(newSets);
    } catch (e) {
      setError(e.message);
      setLottoSets([]);
    }
  }, [mode, userInfo, fixedNumbersInput]);

  const renderInputs = () => {
    switch (mode) {
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2, width: '100%', maxWidth: 400 }}>
            <TextField label="이름" variant="outlined" size="small" value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})} fullWidth />
            <TextField label="생년월일 (YYYYMMDD)" variant="outlined" size="small" value={userInfo.dob} onChange={e => setUserInfo({...userInfo, dob: e.target.value})} fullWidth />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mb: 2, width: '100%', maxWidth: 400 }}>
            <TextField fullWidth label="포함할 번호 (쉼표로 구분)" variant="outlined" size="small" value={fixedNumbersInput} onChange={e => setFixedNumbersInput(e.target.value)} placeholder="예: 7, 15, 23" />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={mode} onChange={handleTabChange} centered indicatorColor="primary" textColor="primary">
          <Tab icon={<NumbersIcon />} iconPosition="start" label="기본 추천" />
          <Tab icon={<PersonIcon />} iconPosition="start" label="사주 추천" />
          <Tab icon={<PlaylistAddCheckIcon />} iconPosition="start" label="번호 포함" />
        </Tabs>
      </Box>

      {renderInputs()}

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2, p: 1, backgroundColor: '#ffebee', borderRadius: 1 }}>{error}</Typography>
      )}

      {sajuInfo && !error && (
        <Typography variant="body2" sx={{ mb: 2, p: 1.5, backgroundColor: theme.palette.background.default, color: theme.palette.primary.dark, borderRadius: 1.5 }}>
            {sajuInfo}
        </Typography>
      )}

      <Button variant="contained" color="primary" size="large" startIcon={<RefreshIcon />} onClick={handleGenerate} sx={{ mb: 4, px: 4, py: 1.5 }}>
        새 번호 생성
      </Button>

      {lottoSets.length > 0 && (
        <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {lottoSets.map((set, setIndex) => (
            <Box key={setIndex} sx={{ py: 1.5, px: 1, backgroundColor: theme.palette.background.paper, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 'bold', color: theme.palette.primary.dark }}>
                세트 {setIndex + 1}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: { xs: 0.8, sm: 1.5 } }}>
                {set.map((num, numIndex) => (
                  <Ball key={`${setIndex}-${numIndex}-${num}`} num={num} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default RecommendNumber;
