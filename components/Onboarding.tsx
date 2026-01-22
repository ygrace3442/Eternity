import React from 'react';
import { Button } from './ui/Button';
import { ShieldCheck, Activity, Users } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const Onboarding: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8 animate-fade-in">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          당신의 건강한 미래,<br />
          <span className="text-teal-600">eternity</span>가 설계합니다.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          가족력과 현재 건강 데이터, 환경 요인을 분석하여<br className="hidden md:block"/>
          다음 세대를 위한 건강 리스크 지도를 그려드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
        {[
          { icon: Users, title: "가족력 분석", desc: "부모님의 질병 이력을 통해 유전적 리스크를 파악합니다." },
          { icon: Activity, title: "현재 건강 진단", desc: "나의 검진 데이터로 현재 상태를 정확히 진단합니다." },
          { icon: ShieldCheck, title: "AI 예측 & 예방", desc: "미래 리스크를 예측하고 맞춤형 예방 가이드를 제공합니다." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
            <div className="p-3 bg-teal-50 rounded-full mb-4">
              <item.icon className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mt-12">
        <Button onClick={onStart} fullWidth size="lg" className="h-12 text-lg">
          내 건강 리스크 지도 만들기
        </Button>
        <p className="text-xs text-slate-400 mt-4">
          본 서비스는 의료 진단을 대체하지 않으며, 입력된 정보는 분석 목적으로만 사용됩니다.
        </p>
      </div>
    </div>
  );
};