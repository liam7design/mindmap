// src/utils/sajuUtils.js
import korLunar from 'kor-lunar';

// --- 명리학 기본 데이터 정의 (이전과 동일) ---
const GAN_TO_OHAENG = {
  '甲': '목', '乙': '목', '丙': '화', '丁': '화', '戊': '토',
  '己': '토', '庚': '금', '辛': '금', '壬': '수', '癸': '수'
};
const JI_TO_OHAENG = {
  '子': '수', '丑': '토', '寅': '목', '卯': '목', '辰': '토',
  '巳': '화', '午': '화', '未': '토', '申': '금', '酉': '금',
  '戌': '토', '亥': '수'
};
const OHAENG_TO_NUMBERS = {
  '목': [3, 8], '화': [2, 7], '토': [5, 10], '금': [4, 9], '수': [1, 6]
};

/**
 * 생년월일(YYYYMMDD)과 오늘 날짜를 기반으로 사주 오행을 분석하여 행운의 숫자를 반환하는 함수
 * @param {string} dob - 'YYYYMMDD' 형식의 생년월일 문자열
 * @param {string} today - 'YYYYMMDD' 형식의 오늘 날짜 문자열 (선택사항)
 * @returns {{luckyNumbers: number[], message: string}}
 */
export function getLuckyNumbersFromSaju(dob, today = null) {
  try {
    if (!dob || dob.length !== 8 || isNaN(parseInt(dob, 10))) {
      throw new Error('올바른 형식의 생년월일(YYYYMMDD)을 입력해주세요.');
    }

    // 오늘 날짜가 제공되지 않은 경우 자동으로 가져오기
    if (!today) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      today = `${year}${month}${day}`;
    }

    const year = parseInt(dob.substring(0, 4), 10);
    const month = parseInt(dob.substring(4, 6), 10);
    const day = parseInt(dob.substring(6, 8), 10);

    // --- 전문가의 에러 핸들링: 라이브러리 지원 범위 명시적 체크 ---
    // kor-lunar 라이브러리는 1890년~2050년 사이의 날짜만 지원합니다.
    if (year < 1891 || year > 2049) {
        throw new Error('1891년부터 2049년 사이의 생년월일만 지원합니다.');
    }

    // 생년월일 사주 정보 계산
    const lunarInfo = korLunar.toLunar(year, month, day);
    const { secha, wolgeon, iljin, isLeapMonth } = lunarInfo;

    // 시주(時柱)는 제외하고 년/월/일주만 사용 (삼주)
    // secha(년), iljin(일)은 필수, wolgeon(월)은 윤달일 경우 비어있을 수 있음
    if (!secha || !iljin) {
        throw new Error('사주 정보를 계산할 수 없습니다. 날짜를 확인해주세요.');
    }

    const ganji = [secha[0], secha[1], wolgeon[0], wolgeon[1], iljin[0], iljin[1]];

    // 오늘 날짜 사주 정보 계산
    const todayYear = parseInt(today.substring(0, 4), 10);
    const todayMonth = parseInt(today.substring(4, 6), 10);
    const todayDay = parseInt(today.substring(6, 8), 10);
    
    const todayLunarInfo = korLunar.toLunar(todayYear, todayMonth, todayDay);
    const { secha: todaySecha, wolgeon: todayWolgeon, iljin: todayIljin, isLeapMonth: todayIsLeapMonth } = todayLunarInfo; //eslint-disable-line no-unused-vars
    
    if (!todaySecha || !todayIljin) {
        throw new Error('오늘 날짜의 사주 정보를 계산할 수 없습니다.');
    }
    
    const todayGanji = [todaySecha[0], todaySecha[1], todayWolgeon[0], todayWolgeon[1], todayIljin[0], todayIljin[1]];

    // 오행 상생 관계 정의 (목생화, 화생토, 토생금, 금생수, 수생목)
    const OHAENG_RELATIONSHIP = {
      '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
    };
    
    const ohaengCount = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
    
    // 생년월일 사주 오행 카운트 (가중치: 0.7)
    const birthWeight = 0.7;
    
    // 생년월일 천간 오행 카운트
    if (ganji[0] && GAN_TO_OHAENG[ganji[0]]) {
      ohaengCount[GAN_TO_OHAENG[ganji[0]]] += birthWeight;
    }
    if (ganji[2] && GAN_TO_OHAENG[ganji[2]]) {
      ohaengCount[GAN_TO_OHAENG[ganji[2]]] += birthWeight; // 월주가 있을 경우에만 카운트
    }
    if (ganji[4] && GAN_TO_OHAENG[ganji[4]]) {
      ohaengCount[GAN_TO_OHAENG[ganji[4]]] += birthWeight;
    }

    // 생년월일 지지 오행 카운트
    if (ganji[1] && JI_TO_OHAENG[ganji[1]]) {
      ohaengCount[JI_TO_OHAENG[ganji[1]]] += birthWeight;
    }
    if (ganji[3] && JI_TO_OHAENG[ganji[3]]) {
      ohaengCount[JI_TO_OHAENG[ganji[3]]] += birthWeight; // 월주가 있을 경우에만 카운트
    }
    if (ganji[5] && JI_TO_OHAENG[ganji[5]]) {
      ohaengCount[JI_TO_OHAENG[ganji[5]]] += birthWeight;
    }

    // 오늘 날짜 사주 오행 카운트 (가중치: 0.3)
    const todayWeight = 0.3;
    
    // 오늘 날짜 천간 오행 카운트
    if (todayGanji[0] && GAN_TO_OHAENG[todayGanji[0]]) {
      ohaengCount[GAN_TO_OHAENG[todayGanji[0]]] += todayWeight;
    }
    if (todayGanji[2] && GAN_TO_OHAENG[todayGanji[2]]) {
      ohaengCount[GAN_TO_OHAENG[todayGanji[2]]] += todayWeight;
    }
    if (todayGanji[4] && GAN_TO_OHAENG[todayGanji[4]]) {
      ohaengCount[GAN_TO_OHAENG[todayGanji[4]]] += todayWeight;
    }

    // 오늘 날짜 지지 오행 카운트
    if (todayGanji[1] && JI_TO_OHAENG[todayGanji[1]]) {
      ohaengCount[JI_TO_OHAENG[todayGanji[1]]] += todayWeight;
    }
    if (todayGanji[3] && JI_TO_OHAENG[todayGanji[3]]) {
      ohaengCount[JI_TO_OHAENG[todayGanji[3]]] += todayWeight;
    }
    if (todayGanji[5] && JI_TO_OHAENG[todayGanji[5]]) {
      ohaengCount[JI_TO_OHAENG[todayGanji[5]]] += todayWeight;
    }
    
    // 오행 상생 관계를 고려한 보너스 점수
    const bonusWeight = 0.1;
    for (const ohaeng in ohaengCount) {
      if (ohaengCount[ohaeng] > 0) {
        const relatedOhaeng = OHAENG_RELATIONSHIP[ohaeng];
        if (relatedOhaeng && ohaengCount[relatedOhaeng] !== undefined) {
          ohaengCount[relatedOhaeng] += bonusWeight;
        }
      }
    }
    
    let maxCount = 0;
    let dominantOhaeng = '';
    
    for (const ohaeng in ohaengCount) {
      if (ohaengCount[ohaeng] > maxCount) {
        maxCount = ohaengCount[ohaeng];
        dominantOhaeng = ohaeng;
      }
    }
    
    // 모든 오행이 0인 경우 기본값 설정
    if (maxCount === 0) {
      dominantOhaeng = '토'; // 기본값으로 토(土) 설정
    }

    const luckyNumbers = OHAENG_TO_NUMBERS[dominantOhaeng] || [];
    
    // 오늘 날짜 정보 추가
    const todayDate = new Date();
    const todayFormatted = `${todayDate.getFullYear()}년 ${todayDate.getMonth() + 1}월 ${todayDate.getDate()}일`;
    
    let message = `사주 분석 결과, 당신의 가장 강한 기운은 [${dominantOhaeng}] 입니다. 행운의 숫자는 [${luckyNumbers.join(', ')}] 입니다.`;
    message += ` (${todayFormatted} 기운 반영)`;
    if(isLeapMonth) message += " (태어난 달은 윤달입니다.)";


    return { luckyNumbers, message };

  } catch (error) {
    console.error("사주 분석 오류:", error);
    
    // 더 구체적인 에러 메시지 제공
    let errorMessage = '사주 분석에 실패했습니다.';
    
    if (error.message.includes('YYYYMMDD')) {
      errorMessage = '올바른 형식의 생년월일(YYYYMMDD)을 입력해주세요.';
    } else if (error.message.includes('1891년부터 2049년')) {
      errorMessage = '1891년부터 2049년 사이의 생년월일만 지원합니다.';
    } else if (error.message.includes('사주 정보를 계산할 수 없습니다')) {
      errorMessage = '사주 정보를 계산할 수 없습니다. 날짜를 확인해주세요.';
    } else if (error.name === 'RangeError') {
      errorMessage = '지원하지 않는 날짜입니다. 다른 날짜를 시도해주세요.';
    } else {
      errorMessage = `사주 분석 중 오류가 발생했습니다: ${error.message}`;
    }
    
    return { 
        luckyNumbers: [], 
        message: errorMessage
    };
  }
}
