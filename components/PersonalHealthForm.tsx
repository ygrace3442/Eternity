import React from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { PersonalHealth, SmokingStatus } from '../types';

interface Props {
  data: PersonalHealth;
  onUpdate: (data: PersonalHealth) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PersonalHealthForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const handleChange = (field: keyof PersonalHealth, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">나의 건강 데이터</h2>
        <p className="text-slate-600 mb-6">
          최근 건강검진 결과표가 있다면 보고 입력해주세요. 정확할수록 분석 결과가 정교해집니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 border-b pb-2">기본 정보</h3>
            <div className="grid grid-cols-2 gap-4">
                <Input label="나이" type="number" value={data.age} onChange={(e) => handleChange('age', Number(e.target.value))} />
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">성별</label>
                    <select 
                        className="w-full p-2 border border-slate-300 rounded-md"
                        value={data.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    >
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input label="키" suffix="cm" type="number" value={data.height} onChange={(e) => handleChange('height', Number(e.target.value))} />
                <Input label="몸무게" suffix="kg" type="number" value={data.weight} onChange={(e) => handleChange('weight', Number(e.target.value))} />
            </div>
            <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">흡연 여부</label>
                 <select 
                    className="w-full p-2 border border-slate-300 rounded-md"
                    value={data.smoking}
                    onChange={(e) => handleChange('smoking', e.target.value)}
                >
                    {Object.values(SmokingStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 border-b pb-2">혈액 및 혈압 (검진 결과)</h3>
            <div className="grid grid-cols-2 gap-4">
                <Input label="수축기 혈압" suffix="mmHg" type="number" value={data.systolicBP} onChange={(e) => handleChange('systolicBP', Number(e.target.value))} />
                <Input label="이완기 혈압" suffix="mmHg" type="number" value={data.diastolicBP} onChange={(e) => handleChange('diastolicBP', Number(e.target.value))} />
            </div>
            <Input label="공복 혈당" suffix="mg/dL" type="number" value={data.fastingGlucose} onChange={(e) => handleChange('fastingGlucose', Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-4">
                <Input label="총 콜레스테롤" suffix="mg/dL" type="number" value={data.totalCholesterol} onChange={(e) => handleChange('totalCholesterol', Number(e.target.value))} />
                <Input label="중성지방" suffix="mg/dL" type="number" value={data.triglycerides} onChange={(e) => handleChange('triglycerides', Number(e.target.value))} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <Input label="LDL 콜레스테롤" suffix="mg/dL" type="number" value={data.ldl} onChange={(e) => handleChange('ldl', Number(e.target.value))} />
                <Input label="HDL 콜레스테롤" suffix="mg/dL" type="number" value={data.hdl} onChange={(e) => handleChange('hdl', Number(e.target.value))} />
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
             <h3 className="font-semibold text-slate-800 border-b pb-2">환경 요인</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <Input 
                    label="거주 지역" 
                    placeholder="예: 서울시 강남구"
                    value={data.location} 
                    onChange={(e) => handleChange('location', e.target.value)} 
                />
                <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
                    <p>📍 입력하신 지역의 <strong>연평균 미세먼지 농도</strong>를 자동으로 추산하여 호흡기 질환 리스크 분석에 반영합니다.</p>
                </div>
             </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="secondary">이전</Button>
        <Button onClick={onNext}>결과 분석하기</Button>
      </div>
    </div>
  );
};