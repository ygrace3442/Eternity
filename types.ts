export enum Relationship {
  FATHER = '아버지',
  MOTHER = '어머니',
  GRANDFATHER_PATERNAL = '친할아버지',
  GRANDMOTHER_PATERNAL = '친할머니',
  GRANDFATHER_MATERNAL = '외할아버지',
  GRANDMOTHER_MATERNAL = '외할머니'
}

export enum SmokingStatus {
  NON_SMOKER = '비흡연',
  PAST_SMOKER = '과거 흡연',
  CURRENT_SMOKER = '현재 흡연'
}

export interface DiseaseHistory {
  name: string;
  diagnosisAge: number;
  isCauseOfDeath: boolean;
  deathAge?: number;
  note?: string;
}

export interface FamilyMember {
  id: string;
  relationship: Relationship;
  smoking: SmokingStatus;
  diseases: DiseaseHistory[];
  deceased: boolean;
}

export interface PersonalHealth {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  smoking: SmokingStatus;
  systolicBP: number;
  diastolicBP: number;
  fastingGlucose: number;
  totalCholesterol: number;
  ldl: number;
  hdl: number;
  triglycerides: number;
  location: string;
  environmentalRiskScore: number;
}

export interface PredictionPoint {
  year: string;
  status: string;
  score: number;
}

export interface AnalysisResult {
  summary: string;
  risk_scores: {
    cardiovascular: number;
    respiratory: number;
    metabolic: number;
  };
  radar_chart_data: {
    labels: string[];
    user_values: number[];
    age_group_avg: number[];
  };
  risk_analysis_text: {
    cardiovascular: string;
    respiratory: string;
    metabolic: string;
  };
  prediction_timeline: PredictionPoint[];
  action_plan: string[];
  comparison_with_family: string;
}

export interface AppState {
  step: number;
  familyHistory: FamilyMember[];
  personalHealth: PersonalHealth;
  analysis: AnalysisResult | null;
}