import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { demoClinic, demoPatient, eligibilityProfile, eligibilityRuleSet } from '../../data/demoData'
import { checkEligibility } from '../../domain/eligibility'
import type { EligibilityResult } from '../../domain/types'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

type EligibilityStep = 'clinic' | 'symptoms' | 'result'

export function PatientEligibility() {
  const navigate = useNavigate()
  const { setEligibility } = useDemoEncounter()
  const [step, setStep] = useState<EligibilityStep>('clinic')
  const [result, setResult] = useState<EligibilityResult | null>(null)

  const answerSymptoms = (sameSymptoms: boolean) => {
    const nextResult = checkEligibility(eligibilityProfile, { sameSymptoms }, eligibilityRuleSet)
    setResult(nextResult)
    setEligibility(nextResult)
    setStep('result')
  }

  return (
    <main className="patient-shell eligibility-screen">
      <header className="flow-header">
        <button className="icon-button" type="button" aria-label="이전 화면" onClick={() => navigate('/patient/home')}>‹</button>
        <div><span className="eyebrow">ELIGIBILITY CHECK</span><strong>비대면 재진 확인</strong></div>
        <span className="step-count">{step === 'clinic' ? '1' : step === 'symptoms' ? '2' : '3'} / 3</span>
      </header>
      <div className="flow-progress" aria-hidden="true"><span style={{ width: step === 'clinic' ? '33%' : step === 'symptoms' ? '66%' : '100%' }} /></div>

      {step === 'clinic' && (
        <section className="flow-content">
          <span className="flow-symbol" aria-hidden="true">✚</span>
          <h1>다니던 병원을 선택해 주세요</h1>
          <p className="flow-lead">진료 기록이 확인된 병원만 보여드려요.</p>
          <button className="select-card" type="button" aria-label={`${demoClinic.name} 선택`} onClick={() => setStep('symptoms')}>
            <span className="clinic-icon">✚</span>
            <span><strong>{demoClinic.name}</strong><small>{demoClinic.specialty}</small><small>{demoClinic.distance}</small></span>
            <span className="chevron" aria-hidden="true">›</span>
          </button>
          <div className="verified-row"><span aria-hidden="true">✓</span> {demoPatient.previousVisitDate} 대면 진료 기록 확인</div>
        </section>
      )}

      {step === 'symptoms' && (
        <section className="flow-content">
          <span className="flow-symbol" aria-hidden="true">⌁</span>
          <h1>지난 진료와 같은 증상인가요?</h1>
          <p className="flow-lead">최근 진단: <strong>{demoPatient.previousDiagnosis}</strong></p>
          <div className="symptom-note"><span aria-hidden="true">“</span><p>재채기, 맑은 콧물, 코막힘 증상이 다시 시작됐어요.</p></div>
          <div className="choice-stack">
            <button className="choice-card positive" type="button" aria-label="네, 같은 증상이에요" onClick={() => answerSymptoms(true)}>
              <span aria-hidden="true">✓</span><span><strong>네, 같은 증상이에요</strong><small>비대면 재진 가능 여부를 확인합니다</small></span>
            </button>
            <button className="choice-card" type="button" aria-label="아니요, 다른 새 증상이에요" onClick={() => answerSymptoms(false)}>
              <span aria-hidden="true">＋</span><span><strong>아니요, 다른 새 증상이에요</strong><small>안전을 위해 대면 진료를 안내합니다</small></span>
            </button>
          </div>
        </section>
      )}

      {step === 'result' && result && (
        <section className={`flow-content result-content ${result.status}`}>
          <span className="result-mark" aria-hidden="true">{result.status === 'eligible' ? '✓' : '!'}</span>
          <span className="eyebrow">CHECK COMPLETE</span>
          <h1>{result.status === 'eligible' ? '비대면 재진 예약 대상입니다' : '대면 진료가 필요합니다'}</h1>
          <p className="flow-lead">{result.summary}</p>
          <div className="check-list">
            {result.checks.map((check) => (
              <div className={check.passed ? 'passed' : 'failed'} key={check.id}>
                <span aria-hidden="true">{check.passed ? '✓' : '!'}</span><strong>{check.label}</strong><small>{check.passed ? '확인됨' : '확인 필요'}</small>
              </div>
            ))}
          </div>
          <div className="rule-chip">{result.ruleSetName} · {result.ruleSetAsOf}</div>
          <p className="clinical-caveat">예약 가능 여부에 대한 행정적 안내입니다. 의사는 진료 중 대면 진료로 전환할 수 있습니다.</p>
          {result.status === 'eligible' ? (
            <button className="primary-button" type="button" onClick={() => navigate('/patient/schedule')}>예약 시간 선택하기 <span aria-hidden="true">→</span></button>
          ) : (
            <button className="primary-button secondary-button" type="button" onClick={() => navigate('/patient/home')}>대면 진료 예약 보기</button>
          )}
        </section>
      )}
    </main>
  )
}
