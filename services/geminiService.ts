import { GoogleGenAI, Type } from "@google/genai";
import { FamilyMember, PersonalHealth, AnalysisResult } from '../types';

export const generateHealthRiskAnalysis = async (
  familyHistory: FamilyMember[],
  personalHealth: PersonalHealth
): Promise<AnalysisResult> => {
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    당신은 건강 리스크 분석 엔진 "Eternity AI"입니다.
    사용자 데이터를 기반으로 질환 리스크를 분석하여 JSON으로 응답하세요. 
    응답은 최대한 간결하고 핵심적인 정보 위주로 작성하여 생성 속도를 최적화하세요.

    [데이터]
    가족력: ${JSON.stringify(familyHistory)}
    현재상태: ${JSON.stringify(personalHealth)}

    [분석 로직]
    1. 유전적 취약성(가족력)을 베이스로 하고, 현재 지표(혈압/혈당 등)가 정상이면 완화, 비정상이면 증폭하세요.
    2. 거주지의 환경 요인을 호흡기 리스크에 반영하세요.
    3. 5년 후의 미래를 '관리 성공'과 '실패' 시나리오로 예측하세요.

    [JSON 필드]
    - summary: 핵심 3줄 요약
    - risk_scores: 심혈관, 호흡기, 대사 질환 점수 (0-100)
    - radar_chart_data: 5개 항목(심혈관, 호흡기, 대사, 간, 면역) 점수 및 동나이대 평균
    - risk_analysis_text: 각 질환별 짧고 강렬한 분석 문구
    - prediction_timeline: 현재/5년후(미관리)/5년후(관리) 점수와 상태
    - action_plan: 구체적 실행 방안 3가지
    - comparison_with_family: 가족력 대비 현재 상태 요약
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 }, // 추론 과정 생략으로 응답 속도 극대화
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            risk_scores: {
              type: Type.OBJECT,
              properties: {
                cardiovascular: { type: Type.NUMBER },
                respiratory: { type: Type.NUMBER },
                metabolic: { type: Type.NUMBER }
              }
            },
            radar_chart_data: {
              type: Type.OBJECT,
              properties: {
                labels: { type: Type.ARRAY, items: { type: Type.STRING } },
                user_values: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                age_group_avg: { type: Type.ARRAY, items: { type: Type.NUMBER } }
              }
            },
            risk_analysis_text: {
              type: Type.OBJECT,
              properties: {
                cardiovascular: { type: Type.STRING },
                respiratory: { type: Type.STRING },
                metabolic: { type: Type.STRING }
              }
            },
            prediction_timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.STRING },
                  status: { type: Type.STRING },
                  score: { type: Type.NUMBER }
                }
              }
            },
            action_plan: { type: Type.ARRAY, items: { type: Type.STRING } },
            comparison_with_family: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};