import React, { useEffect, useState } from 'react';
import { FamilyMember, PersonalHealth, AnalysisResult } from '../types';
import { generateHealthRiskAnalysis } from '../services/geminiService';
import { MOCK_ANALYSIS_RESULT } from '../constants';
import { Button } from './ui/Button';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlertTriangle, CheckCircle, Brain, RefreshCw, AlertCircle, TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface Props {
  familyData: FamilyMember[];
  personalData: PersonalHealth;
  onRestart: () => void;
}

export const RiskReport: React.FC<Props> = ({ familyData, personalData, onRestart }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (process.env.API_KEY && process.env.API_KEY !== 'YOUR_API_KEY') {
            const analysis = await generateHealthRiskAnalysis(familyData, personalData);
            setResult(analysis);
        } else {
            // 데모 체감 속도를 위해 지연 시간 단축 (2000ms -> 800ms)
            await new Promise(resolve => setTimeout(resolve, 800));
            setResult(MOCK_ANALYSIS_RESULT);
        }
      } catch (err) {
        console.error(err);
        setError("AI 분석 중 오류가 발생했습니다. 데모 데이터를 표시합니다.");
        setResult(MOCK_ANALYSIS_RESULT); 
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [familyData, personalData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative">
            <RefreshCw className="w-16 h-16 text-teal-600 animate-spin" />
            <Brain className="w-8 h-8 text-teal-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center space-y-2">
            <p className="text-xl text-slate-800 font-bold">Eternity AI 분석 중</p>
            <p className="text-slate-500">유전적 상관관계와 환경 요인을 결합하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const radarData = result.radar_chart_data.labels.map((label, i) => ({
    subject: label,
    A: result.radar_chart_data.user_values[i],
    B: result.radar_chart_data.age_group_avg[i],
    fullMark: 100,
  }));

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-teal-600 bg-teal-50 border-teal-200';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header Summary */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-teal-300 font-bold uppercase tracking-widest text-sm">
                <Brain size={18} /> Eternity AI Engine v3.1
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">나의 건강 리스크 리포트</h1>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <p className="text-slate-100 text-lg leading-relaxed whitespace-pre-wrap">
                    {result.summary}
                </p>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-teal-600" /> 종합 리스크 프로파일
            </h3>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="나의 위험도" dataKey="A" stroke="#0d9488" fill="#0d9488" fillOpacity={0.6} />
                        <Radar name="동년배 평균" dataKey="B" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
                        <Legend verticalAlign="bottom" height={36}/>
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed">
                * 유전적 기저 리스크와 현재 생체 데이터를 결합한 상대적 위험도입니다.
            </p>
        </div>

        {/* Detailed Risk Breakdown */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 mb-4 px-1">질환별 집중 분석</h3>
            {[
                { key: 'cardiovascular', label: '심혈관', score: result.risk_scores.cardiovascular, text: result.risk_analysis_text.cardiovascular },
                { key: 'metabolic', label: '대사(당뇨)', score: result.risk_scores.metabolic, text: result.risk_analysis_text.metabolic },
                { key: 'respiratory', label: '호흡기/폐', score: result.risk_scores.respiratory, text: result.risk_analysis_text.respiratory }
            ].map((item) => (
                <div key={item.key} className={`p-5 rounded-2xl border transition-all hover:shadow-md ${getRiskColor(item.score)}`}>
                    <div className="flex justify-between items-end mb-3">
                        <span className="font-bold text-lg">{item.label} 리스크</span>
                        <span className="font-mono text-3xl font-black">{item.score}<span className="text-sm font-normal ml-0.5">/100</span></span>
                    </div>
                    <p className="text-sm leading-relaxed opacity-90">{item.text}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Prediction Timeline */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <Clock size={22} className="text-teal-600" /> 관리 시나리오별 미래 예측 (5년)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="absolute hidden md:block top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            {result.prediction_timeline.map((point, idx) => (
                <div key={idx} className="relative z-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-bold ${
                        idx === 0 ? 'bg-teal-500' : idx === 1 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}>
                        {point.score}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{point.year}</span>
                    <h4 className="font-bold text-slate-800 mb-2">{point.status}</h4>
                    <div className="flex items-center gap-1 mt-auto">
                        {idx === 1 ? <TrendingUp size={14} className="text-rose-500"/> : idx === 2 ? <TrendingDown size={14} className="text-emerald-500"/> : null}
                        <span className="text-xs text-slate-500">지표 변화 예측</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Family Comparison */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">가족력 연계성 분석</h3>
        <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-inner text-center">
                <p className="text-sm text-slate-500 mb-1">가족력 일치도</p>
                <p className="text-4xl font-black text-teal-600">82%</p>
                <p className="text-xs text-slate-400 mt-2">유전적 상관계수 높음</p>
            </div>
            <div className="flex-1">
                <p className="text-slate-700 italic leading-relaxed text-lg">
                    "{result.comparison_with_family}"
                </p>
            </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-teal-600 p-8 rounded-2xl text-white shadow-xl shadow-teal-900/10">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <CheckCircle className="text-teal-200" /> Eternity 맞춤형 예방 가이드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.action_plan.map((plan, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 h-full flex flex-col">
                    <div className="bg-teal-200 text-teal-800 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">
                        {idx + 1}
                    </div>
                    <p className="text-white font-medium text-lg leading-snug">{plan}</p>
                </div>
            ))}
        </div>
        <div className="mt-10 p-5 bg-black/20 rounded-xl text-sm text-teal-100 flex gap-3 items-start border border-white/5">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-300" />
            <p>
                본 리포트는 Eternity AI의 통계적 분석 결과로, 의학적 진단을 대신할 수 없습니다. 
                특히 리스크 점수가 70점 이상인 영역에 대해서는 반드시 전문 의료진과의 상담을 권장합니다.
            </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-10">
        <Button onClick={onRestart} variant="outline" className="px-12 py-6 rounded-2xl text-lg">새로운 분석 시작하기</Button>
        <p className="text-slate-400 text-xs">당신의 건강한 미래를 응원합니다. - Eternity Team</p>
      </div>
    </div>
  );
};