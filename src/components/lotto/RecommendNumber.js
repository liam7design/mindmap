import React, { useState, useCallback, useEffect } from 'react';
import Ball from './Ball';
import { Button, Box, Typography, Tabs, Tab, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { getLuckyNumbersFromSaju } from '../../utils/lotto/sajuUtils';

// 기본 로또 번호 생성 함수
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

// 특정 번호를 포함한 로또 번호 생성 함수
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

function RecommendNumber() {
  const [lottoSets, setLottoSets] = useState([]);
  const [mode, setMode] = useState(0); // 0: 기본, 1: 사주, 2: 번호 포함
  const [userInfo, setUserInfo] = useState({ name: '', dob: '' });
  const [fixedNumbersInput, setFixedNumbersInput] = useState('');
  const [error, setError] = useState('');
  const [sajuInfo, setSajuInfo] = useState('');

  // 번호 생성 함수 (useCallback으로 감쌈)
  const handleGenerate = useCallback(() => {
    setError('');
    setSajuInfo('');
    let newSets = [];
    try {
      if (mode === 0) {
        // 기본 추천
        newSets = Array(5).fill(null).map(() => generateLottoSet());
      } else if (mode === 1) {
        // 사주 추천
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
      } else if (mode === 2) {
        // 번호 포함 추천
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

  // 최초 렌더링 시 번호 생성 (handleGenerate를 의존성에 추가)
  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  // 탭 변경 시 초기화
  const handleTabChange = (event, newValue) => {
    setMode(newValue);
    setLottoSets([]);
    setError('');
    setSajuInfo('');
    setUserInfo({ name: '', dob: '' });
    setFixedNumbersInput('');
  };

  // 입력창 렌더링
  const renderInputs = () => {
    switch (mode) {
      case 1:
        return (
          <Box sx={{ my: 2 }}>
            <TextField
              label="이름"
              value={userInfo.name}
              onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="생년월일 (YYYYMMDD)"
              value={userInfo.dob}
              onChange={e => setUserInfo({ ...userInfo, dob: e.target.value })}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ my: 2 }}>
            <TextField
              label="포함할 번호 (최대 5개, 쉼표로 구분)"
              value={fixedNumbersInput}
              onChange={e => setFixedNumbersInput(e.target.value)}
              placeholder="예: 7, 15, 23"
              fullWidth
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Tabs value={mode} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab icon={<NumbersIcon />} iconPosition="start" label="기본 추천" />
        <Tab icon={<PersonIcon />} iconPosition="start" label="사주 추천" />
        <Tab icon={<PlaylistAddCheckIcon />} iconPosition="start" label="번호 포함" />
      </Tabs>
      {renderInputs()}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}
      {sajuInfo && !error && (
        <Typography color="primary" sx={{ mb: 2 }}>{sajuInfo}</Typography>
      )}
      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={handleGenerate}
        sx={{ mb: 4, px: 4, py: 1.5 }}
      >
        새 번호 생성
      </Button>
      {lottoSets.length > 0 && (
        <Box>
          {lottoSets.map((set, setIndex) => (
            <Box key={setIndex} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">세트 {setIndex + 1}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {set.map((num, numIndex) => (
                  <Ball key={numIndex} number={num} />
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
