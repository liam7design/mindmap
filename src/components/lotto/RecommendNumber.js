import React, { useState, useCallback, useEffect } from 'react';
import Ball from './Ball';
import { Box, Typography, Tabs, Tab, TextField, useTheme, IconButton, Tooltip, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getLuckyNumbersFromSaju } from '../../utils/lotto/sajuUtils';
import { FloatingBox, FloatingButton } from '../ui/FloatingBox';

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
  const [mode, setMode] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: '', dob: '' });
  const [fixedNumbersInput, setFixedNumbersInput] = useState(''); //eslint-disable-line no-unused-vars
  const [fixedNumbers, setFixedNumbers] = useState(['', '', '', '', '']); // 5개의 입력박스를 위한 상태
  const [error, setError] = useState('');
  const [sajuInfo, setSajuInfo] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const theme = useTheme();

  // 환영 메시지 배열
  const welcomeMessages = [
    "복잡한 고민 없이, 단 한 번의 클릭으로 나만의 행운의 로또번호를 쉽고 빠르게 만들어보세요! 당첨의 기회를 지금 바로 경험해보세요.",
    "운명의 숫자가 당신을 기다리고 있습니다! 행운의 로또번호 생성 버튼을 눌러보세요. 오늘은 당신의 날이 될지도 모릅니다!",
    "꿈꾸던 당첨이 현실이 될 수 있습니다! 지금 바로 행운의 로또번호를 생성해보세요. 기적은 준비된 사람에게 찾아옵니다!",
    "복권의 신이 당신을 부르고 있습니다! 행운의 로또번호 생성 버튼을 클릭하면, 당신만의 특별한 번호가 나타날 것입니다!",
    "오늘 하루, 행운이 당신과 함께하기를 바랍니다! 로또번호 생성 버튼을 눌러보세요. 기적은 믿는 자에게 찾아옵니다!",
    "당신의 행운을 깨워보세요! 한 번의 클릭으로 나만의 특별한 로또번호를 만들어보세요. 오늘은 다른 하루가 될 것입니다!",
    "꿈꾸던 부자가 될 기회가 여기 있습니다! 행운의 로또번호를 생성해보세요. 기적은 준비된 사람에게 찾아옵니다!",
    "복권의 여신이 당신을 기다리고 있습니다! 지금 바로 행운의 로또번호를 생성해보세요. 오늘은 당신의 특별한 날이 될 것입니다!"
  ];

  useEffect(() => {
    // 초기 환영 메시지 설정
    const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    setWelcomeMessage(randomMessage);
    // 초기 로드 시에는 번호 생성하지 않고 환영 메시지만 표시
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (event, newValue) => {
    setMode(newValue);
    setLottoSets([]);
    setError('');
    setSajuInfo('');
    setUserInfo({ name: '', dob: '' });
    setFixedNumbersInput('');
    setFixedNumbers(['', '', '', '', '']); // 입력박스 초기화
    
    // 기본 추천 탭으로 돌아올 때 새로운 환영 메시지 설정
    if (newValue === 0) {
      const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      setWelcomeMessage(randomMessage);
    }
  };

  // 입력박스 값 변경 핸들러
  const handleNumberInputChange = (index, value) => {
    // 숫자만 입력 허용
    if (value !== '' && !/^\d{0,2}$/.test(value)) {
      return;
    }
    
    const newNumbers = [...fixedNumbers];
    newNumbers[index] = value;
    setFixedNumbers(newNumbers);
    
    // 실시간 유효성 검사
    if (value !== '') {
      const num = parseInt(value, 10);
      if (num >= 1 && num <= 45) {
        // 중복 검사
        const otherNumbers = newNumbers.filter((_, i) => i !== index);
        if (otherNumbers.includes(value)) {
          setError('중복된 번호를 입력할 수 없습니다.');
        } else {
          setError(''); // 에러 메시지 초기화
        }
      }
    } else {
      setError(''); // 빈 값일 때 에러 메시지 초기화
    }
  };

  // 입력박스에서 포커스가 벗어날 때 최종 유효성 검사
  const handleNumberInputBlur = (index, value) => {
    if (value === '') return; // 빈 값은 허용
    
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || num > 45) {
      const newNumbers = [...fixedNumbers];
      newNumbers[index] = '';
      setFixedNumbers(newNumbers);
      setError('1부터 45 사이의 숫자만 입력해주세요.');
      return;
    }
    
    setError(''); // 에러 메시지 초기화
  };

  // 키보드 이벤트 핸들러 (Enter 키로 다음 입력박스로 이동)
  const handleNumberInputKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < 4) {
        // 다음 입력박스로 포커스 이동
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // 리셋 버튼 핸들러
  const handleReset = () => {
    setFixedNumbers(['', '', '', '', '']);
    setError('');
  };

  // 입력된 번호가 있는지 확인
  const hasInputNumbers = fixedNumbers.some(num => num !== '');

  const handleGenerate = useCallback(() => {
    setError('');
    setSajuInfo('');
    setWelcomeMessage(''); // 번호 생성 시 환영 메시지 숨김
    let newSets = [];

    try {
      if (mode === 0) {
        newSets = Array(5).fill(null).map(() => generateLottoSet());
      } 
      else if (mode === 1) {
        if (!userInfo.name || !userInfo.dob) {
          throw new Error('이름과 생년월일을 모두 입력해주세요.');
        }

        // 생년월일 형식 검증
        const dobPattern = /^\d{8}$/;
        if (!dobPattern.test(userInfo.dob)) {
          throw new Error('생년월일은 8자리 숫자(YYYYMMDD)로 입력해주세요.');
        }

        const { luckyNumbers, message } = getLuckyNumbersFromSaju(userInfo.dob);
        setSajuInfo(message);

        if (luckyNumbers.length === 0) {
          throw new Error(message || '사주 분석에 실패했습니다. 생년월일을 다시 확인해주세요.');
        }

        newSets = Array(5).fill(null).map(() => {
          const fixedNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)];
          return generateLottoSetWithFixedNumbers([fixedNumber]);
        });

      } 
      else if (mode === 2) {
        // 새로운 입력박스 방식 사용
        const validNumbers = fixedNumbers.filter(num => num !== '').map(Number);
        
        if (validNumbers.length === 0) {
          throw new Error('포함할 번호를 최소 1개 이상 입력해주세요.');
        }
        if (validNumbers.length > 5) {
          throw new Error('포함할 번호는 최대 5개까지 입력할 수 있습니다.');
        }
        if (new Set(validNumbers).size !== validNumbers.length) {
          throw new Error('중복된 번호를 입력할 수 없습니다.');
        }
        if (validNumbers.some(n => isNaN(n) || n < 1 || n > 45)) {
          throw new Error('1부터 45 사이의 숫자만 입력해주세요.');
        }

        newSets = Array(5).fill(null).map(() => generateLottoSetWithFixedNumbers(validNumbers));
      }
      setLottoSets(newSets);
    } catch (e) {
      setError(e.message);
      setLottoSets([]);
    }
  }, [mode, userInfo, fixedNumbers]);

  const renderInputs = () => {
    switch (mode) {
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, width: '100%' }}>
            <TextField 
              label="이름" 
              variant="outlined" 
              size="small" 
              value={userInfo.name} 
              onChange={e => setUserInfo({...userInfo, name: e.target.value})} 
              fullWidth 
            />
            <TextField 
              label="생년월일 (YYYYMMDD)" 
              variant="outlined" 
              size="small" 
              value={userInfo.dob} 
              onChange={e => setUserInfo({...userInfo, dob: e.target.value})} 
              placeholder="예: 19900101"
              helperText="8자리 숫자로 입력해주세요 (예: 19900101)"
              fullWidth 
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
              💡 오늘 날짜의 기운도 함께 반영됩니다
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mb: 2, width: '100%' }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
              포함할 번호를 입력하세요 (1-45, 최대 5개)
            </Typography>
            <Typography variant="caption" sx={{ mb: 2, color: 'text.secondary', display: 'block' }}>
              💡 Enter 키를 눌러 다음 입력박스로 이동할 수 있습니다
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {fixedNumbers.map((value, index) => (
                  <TextField
                    key={index}
                    value={value}
                    onChange={(e) => handleNumberInputChange(index, e.target.value)}
                    onBlur={(e) => handleNumberInputBlur(index, e.target.value)}
                    onKeyDown={(e) => handleNumberInputKeyDown(index, e)}
                    variant="outlined"
                    size="small"
                    sx={{
                      width: '60px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '& input': {
                          textAlign: 'center',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                        },
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          transform: 'translateY(-1px)',
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                          transform: 'translateY(-1px)',
                        }
                      }
                    }}
                    inputProps={{
                      maxLength: 2,
                      pattern: '[0-9]*',
                      inputMode: 'numeric',
                      'data-index': index
                    }}
                    placeholder=""
                  />
                ))}
              </Box>
              {hasInputNumbers && (
                <Tooltip title="입력 초기화" arrow>
                  <IconButton
                    onClick={handleReset}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        transform: 'rotate(180deg)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    size="small"
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ 
        position: 'fixed',
        top: '57px',
        left: 0,
        right: 0,
        borderBottom: 1, 
        borderColor: 'divider',
        backgroundColor: '#fff',
        zIndex: 1
      }}>
        <Tabs value={mode} onChange={handleTabChange} centered indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="기본 추천" />
          <Tab label="사주 추천" />
          <Tab label="번호 포함" />
        </Tabs>
      </Box>
      <Box sx={{ height: '72px' }} />

      {renderInputs()}

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2, p: 1, backgroundColor: '#ffebee', borderRadius: 1 }}>{error}</Typography>
      )}

      {sajuInfo && !error && (
        <Typography variant="body2" sx={{ mb: 2, p: 1.5, backgroundColor: theme.palette.background.default, color: theme.palette.primary.dark, borderRadius: 1.5 }}>
            {sajuInfo}
        </Typography>
      )}

      {welcomeMessage && mode === 0 && lottoSets.length === 0 && (
        <Box sx={{ 
          mb: 3, 
          p: 2.5, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 2,
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: -15,
            left: -15,
            width: 40,
            height: 40,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
            animationDelay: '1s'
          }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <AutoAwesomeIcon sx={{ color: 'white', mr: 1, fontSize: '1.5rem' }} />
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              fontWeight: 500,
              lineHeight: 1.6,
              position: 'relative',
              zIndex: 1,
              mb: 2
            }}
          >
            {welcomeMessage}
          </Typography>
          <Button
            variant="contained"
            onClick={handleGenerate}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                border: '2px solid rgba(255,255,255,0.5)',
              },
              fontWeight: 'bold',
              px: 3,
              py: 1
            }}
          >
            🎯 지금 시작하기
          </Button>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              display: 'block', 
              mt: 1,
              fontSize: '0.75rem'
            }}
          >
            버튼을 클릭하면 나만의 특별한 로또번호가 생성됩니다!
          </Typography>
        </Box>
      )}

      {lottoSets.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {lottoSets.map((set, setIndex) => (
            <Box key={setIndex} sx={{ py: 1.5, px: 1, border: '1px solid #dbdbdb', borderRadius: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                {set.map((num, numIndex) => (
                  <Ball key={`${setIndex}-${numIndex}-${num}`} num={num} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
      
      <FloatingBox>
        <FloatingButton variant="contained" label="행운의 로또 번호 생성" onClick={handleGenerate} />
      </FloatingBox>

    </>
  );
}

export default RecommendNumber;
