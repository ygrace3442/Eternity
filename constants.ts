import { PersonalHealth, SmokingStatus, AnalysisResult } from './types';

export const INITIAL_PERSONAL_HEALTH: PersonalHealth = {
  age: 35,
  gender: 'male',
  height: 175,
  weight: 70,
  smoking: SmokingStatus.NON_SMOKER,
  systolicBP: 120,
  diastolicBP: 80,
  fastingGlucose: 95,
  totalCholesterol: 180,
  ldl: 100,
  hdl: 60,
  triglycerides: 150,
  location: '서울',
  environmentalRiskScore: 5,
};

export const MOCK_ANALYSIS_RESULT: AnalysisResult = {
  summary: "현재 데이터 분석 결과, 부친으로부터 이어지는 유전적 심혈관 취약성이 관찰되나 현재의 철저한 공복혈당 관리가 리스크 증폭을 성공적으로 억제하고 있습니다. 다만, 거주 지역의 환경 요인으로 인해 향후 호흡기 질환 대비가 필요합니다.",
  risk_scores: {
    cardiovascular: 62,
    respiratory: 45,
    metabolic: 28
  },
  radar_chart_data: {
    labels: ["심혈관", "호흡기", "당뇨/대사", "간 기능", "면역/염증"],
    user_values: [62, 45, 28, 35, 40],
    age_group_avg: [45, 30, 40, 38, 35]
  },
  risk_analysis_text: {
    cardiovascular: "부친의 40대 중반 고혈압 진단 이력이 유전적 베이스라인을 높였으나, 현재 정상 혈압(120/80)을 유지하고 있어 발병 시기를 10년 이상 늦출 수 있는 상태입니다.",
    respiratory: "서울 지역의 대기질 노출도와 과거 흡연 이력이 결합되어 폐 기능 약화 리스크가 평균보다 높게 측정되었습니다.",
    metabolic: "BMI와 당뇨 관련 수치가 매우 우수하여 가족력에 있는 당뇨 리스크를 유의미하게 상쇄하고 있습니다."
  },
  prediction_timeline: [
    { "year": "현재", "status": "안정적이나 심혈관 주의", "score": 45 },
    { "year": "5년 후(관리 안 함)", "status": "고혈압 전단계 진입 가능성", "score": 75 },
    { "year": "5년 후(관리 함)", "status": "현재의 건강한 탄력성 유지", "score": 38 }
  ],
  action_plan: [
    "주 3회 30분 이상의 중강도 유산소 운동(수영, 조깅) 필수",
    "염분 섭취를 하루 2,000mg 이하로 제한하는 DASH 식단 적용",
    "미세먼지가 심한 날 외부 활동 시 반드시 보건용 마스크 착용"
  ],
  comparison_with_family: "사용자는 아버지의 40대 초반 생체 지표와 85% 유사한 패턴을 보이고 있으나, 콜레스테롤 수치는 훨씬 양호하여 유전적 운명을 극복 중입니다."
};

export const STEPS = [
  "시작하기",
  "가족력 입력",
  "나의 건강 데이터",
  "위험도 레포트"
];