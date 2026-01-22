import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { FamilyHistoryForm } from './components/FamilyHistoryForm';
import { PersonalHealthForm } from './components/PersonalHealthForm';
import { RiskReport } from './components/RiskReport';
import { STEPS, INITIAL_PERSONAL_HEALTH } from './constants';
import { FamilyMember, PersonalHealth } from './types';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [familyHistory, setFamilyHistory] = useState<FamilyMember[]>([]);
  const [personalHealth, setPersonalHealth] = useState<PersonalHealth>(INITIAL_PERSONAL_HEALTH);

  const nextStep = () => setStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));
  
  const resetApp = () => {
    setStep(0);
    // Optionally reset data
    // setFamilyHistory([]);
    // setPersonalHealth(INITIAL_PERSONAL_HEALTH);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <div className="bg-teal-600 p-1.5 rounded-lg">
                <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">eternity</span>
          </div>
          
          {step > 0 && (
            <div className="hidden md:flex items-center gap-2">
                {STEPS.map((label, idx) => (
                    <div key={idx} className="flex items-center">
                        <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2
                            ${step >= idx ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}
                        `}>
                            {idx + 1}
                        </div>
                        <span className={`text-sm ${step >= idx ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                            {label}
                        </span>
                        {idx < STEPS.length - 1 && (
                            <div className="w-8 h-px bg-slate-200 mx-2" />
                        )}
                    </div>
                ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        {step === 0 && <Onboarding onStart={nextStep} />}
        
        {step === 1 && (
            <FamilyHistoryForm 
                data={familyHistory} 
                onUpdate={setFamilyHistory} 
                onNext={nextStep}
                onBack={prevStep}
            />
        )}
        
        {step === 2 && (
            <PersonalHealthForm 
                data={personalHealth} 
                onUpdate={setPersonalHealth}
                onNext={nextStep}
                onBack={prevStep}
            />
        )}
        
        {step === 3 && (
            <RiskReport 
                familyData={familyHistory}
                personalData={personalHealth}
                onRestart={resetApp}
            />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h5 className="font-bold text-slate-700 mb-2">eternity</h5>
                    <p className="text-sm text-slate-500">
                        가족력과 데이터를 잇는 차세대 헬스케어 리스크 매핑 서비스
                    </p>
                </div>
                <div className="text-xs text-slate-400 space-y-2">
                    <p>본 서비스는 의학적 진단이나 치료를 대신하지 않습니다.</p>
                    <p>제공되는 리스크 점수는 통계적 추정치이며 실제 발병 여부와 다를 수 있습니다.</p>
                    <p>건강에 이상이 있을 경우 반드시 전문 의료진과 상의하십시오.</p>
                    <p className="pt-4">© 2024 eternity. All rights reserved.</p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;