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
 * 생년월일(YYYYMMDD)을 기반으로 사주 오행을 분석하여 행운의 숫자를 반환하는 함수
 * @param {string} dob - 'YYYYMMDD' 형식의 생년월일 문자열
 * @returns {{luckyNumbers: number[], message: string}}
 */
export function getLuckyNumbersFromSaju(dob) {
  try {
    if (!dob || dob.length !== 8 || isNaN(parseInt(dob, 10))) {
      throw new Error('올바른 형식의 생년월일(YYYYMMDD)을 입력해주세요.');
    }

    const year = parseInt(dob.substring(0, 4), 10);
    const month = parseInt(dob.substring(4, 6), 10);
    const day = parseInt(dob.substring(6, 8), 10);

    // --- 전문가의 에러 핸들링: 라이브러리 지원 범위 명시적 체크 ---
    // kor-lunar 라이브러리는 1890년~2050년 사이의 날짜만 지원합니다.
    if (year < 1891 || year > 2049) {
        throw new Error('1891년부터 2049년 사이의 생년월일만 지원합니다.');
    }

    const lunarInfo = korLunar.toLunar(year, month, day);
    const { secha, wolgeon, iljin, isLeapMonth } = lunarInfo;

    // 시주(時柱)는 제외하고 년/월/일주만 사용 (삼주)
    // secha(년), iljin(일)은 필수, wolgeon(월)은 윤달일 경우 비어있을 수 있음
    if (!secha || !iljin) {
        throw new Error('사주 정보를 계산할 수 없습니다. 날짜를 확인해주세요.');
    }

    const ganji = [secha[0], secha[1], wolgeon[0], wolgeon[1], iljin[0], iljin[1]];
    
    const ohaengCount = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
    
    // 천간 오행 카운트
    ohaengCount[GAN_TO_OHAENG[ganji[0]]]++;
    if (ganji[2]) ohaengCount[GAN_TO_OHAENG[ganji[2]]]++; // 월주가 있을 경우에만 카운트
    ohaengCount[GAN_TO_OHAENG[ganji[4]]]++;

    // 지지 오행 카운트
    ohaengCount[JI_TO_OHAENG[ganji[1]]]++;
    if (ganji[3]) ohaengCount[JI_TO_OHAENG[ganji[3]]]++; // 월주가 있을 경우에만 카운트
    ohaengCount[JI_TO_OHAENG[ganji[5]]]++;
    
    let maxCount = 0;
    let dominantOhaeng = '';
    for (const ohaeng in ohaengCount) {
      if (ohaengCount[ohaeng] > maxCount) {
        maxCount = ohaengCount[ohaeng];
        dominantOhaeng = ohaeng;
      }
    }

    const luckyNumbers = OHAENG_TO_NUMBERS[dominantOhaeng] || [];
    let message = `사주 분석 결과, 당신의 가장 강한 기운은 [${dominantOhaeng}] 입니다. 행운의 숫자는 [${luckyNumbers.join(', ')}] 입니다.`;
    if(isLeapMonth) message += " (태어난 달은 윤달입니다.)";


    return { luckyNumbers, message };

  } catch (error) {
    console.error("사주 분석 오류:", error);
    // RangeError 등 라이브러리 자체 에러도 여기서 처리하여 사용자에게 친절한 메시지 반환
    return { 
        luckyNumbers: [], 
        message: error.message // 에러 객체에 담긴 구체적인 메시지를 그대로 전달
    };
  }
}
