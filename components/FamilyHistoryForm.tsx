import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { FamilyMember, Relationship, SmokingStatus, DiseaseHistory } from '../types';
import { Plus, Trash2, UserPlus } from 'lucide-react';

interface Props {
  data: FamilyMember[];
  onUpdate: (data: FamilyMember[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FamilyHistoryForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);

  const addMember = () => {
    const newMember: FamilyMember = {
      id: crypto.randomUUID(),
      relationship: Relationship.FATHER,
      smoking: SmokingStatus.NON_SMOKER,
      diseases: [],
      deceased: false
    };
    onUpdate([...data, newMember]);
    setActiveMemberId(newMember.id);
  };

  const removeMember = (id: string) => {
    onUpdate(data.filter(m => m.id !== id));
    if (activeMemberId === id) setActiveMemberId(null);
  };

  const updateMember = (id: string, field: keyof FamilyMember, value: any) => {
    onUpdate(data.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addDisease = (memberId: string) => {
    const member = data.find(m => m.id === memberId);
    if (member) {
      const newDisease: DiseaseHistory = {
        name: '',
        diagnosisAge: 50,
        isCauseOfDeath: false
      };
      updateMember(memberId, 'diseases', [...member.diseases, newDisease]);
    }
  };

  const updateDisease = (memberId: string, diseaseIndex: number, field: keyof DiseaseHistory, value: any) => {
    const member = data.find(m => m.id === memberId);
    if (member) {
      const newDiseases = [...member.diseases];
      newDiseases[diseaseIndex] = { ...newDiseases[diseaseIndex], [field]: value };
      updateMember(memberId, 'diseases', newDiseases);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">가족력 입력</h2>
        <p className="text-slate-600 mb-6">
          부모님과 조부모님의 주요 질환 이력을 입력해주세요. 유전적 경향성을 파악하는 데 가장 중요한 자료입니다.
        </p>

        {/* Family Member List */}
        <div className="space-y-4 mb-6">
          {data.map((member, index) => (
            <div key={member.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <select 
                    className="p-2 border rounded-md font-medium text-slate-700"
                    value={member.relationship}
                    onChange={(e) => updateMember(member.id, 'relationship', e.target.value)}
                  >
                    {Object.values(Relationship).map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input 
                      type="checkbox" 
                      checked={member.deceased}
                      onChange={(e) => updateMember(member.id, 'deceased', e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    사망 여부
                  </label>
                </div>
                <button onClick={() => removeMember(member.id)} className="text-slate-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">흡연 이력</label>
                    <select
                        className="w-full p-2 border rounded-md"
                        value={member.smoking}
                        onChange={(e) => updateMember(member.id, 'smoking', e.target.value)}
                    >
                        {Object.values(SmokingStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
              </div>

              {/* Diseases Section */}
              <div className="bg-white p-4 rounded-md border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-slate-700">질병 이력</h4>
                    <button onClick={() => addDisease(member.id)} className="text-teal-600 text-xs font-medium hover:underline flex items-center gap-1">
                        <Plus size={14}/> 질병 추가
                    </button>
                </div>
                {member.diseases.length === 0 && <p className="text-xs text-slate-400">등록된 질병 이력이 없습니다.</p>}
                <div className="space-y-3">
                    {member.diseases.map((disease, dIdx) => (
                        <div key={dIdx} className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-5">
                                <Input 
                                    label="진단명" 
                                    placeholder="예: 당뇨, 고혈압"
                                    value={disease.name}
                                    onChange={(e) => updateDisease(member.id, dIdx, 'name', e.target.value)}
                                />
                            </div>
                            <div className="col-span-3">
                                <Input 
                                    label="발병 나이" 
                                    type="number"
                                    value={disease.diagnosisAge}
                                    onChange={(e) => updateDisease(member.id, dIdx, 'diagnosisAge', Number(e.target.value))}
                                />
                            </div>
                             <div className="col-span-4 flex items-center mb-2">
                                <label className="flex items-center gap-1 text-xs text-slate-600">
                                    <input 
                                        type="checkbox"
                                        checked={disease.isCauseOfDeath}
                                        onChange={(e) => updateDisease(member.id, dIdx, 'isCauseOfDeath', e.target.checked)}
                                    />
                                    사망 원인
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={addMember} variant="outline" fullWidth className="dashed border-2 py-4 flex items-center justify-center gap-2">
          <UserPlus size={20} /> 가족 구성원 추가하기
        </Button>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="secondary">이전</Button>
        <Button onClick={onNext} disabled={data.length === 0}>다음 단계로</Button>
      </div>
    </div>
  );
};