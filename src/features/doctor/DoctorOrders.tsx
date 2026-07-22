import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { diagnosisCandidates } from '../../data/demoData'
import { medicationRuleSet } from '../../data/medicationRules'
import { checkMedication } from '../../domain/medication'
import type { ConfirmedDiagnosis, MedicationDecision, PrescriptionOrder } from '../../domain/types'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

const statusCopy = {
  allowed: '비대면 처방 가능',
  conditional: '추가 확인 필요',
  prohibited: '비대면 처방 금지',
}

export function DoctorOrders() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { state, saveOrder } = useDemoEncounter()
  const initialDiagnosis = diagnosisCandidates.find(({ id }) => id === searchParams.get('diagnosis')) ?? diagnosisCandidates[0]
  const [diagnosis, setDiagnosis] = useState<ConfirmedDiagnosis>({ id: initialDiagnosis.id, name: initialDiagnosis.name, code: initialDiagnosis.code })
  const [diagnosisQuery, setDiagnosisQuery] = useState('')
  const [medicationQuery, setMedicationQuery] = useState('')
  const [dose, setDose] = useState('1회 1정')
  const [frequency, setFrequency] = useState('1일 1회')
  const [timing, setTiming] = useState('취침 전')
  const [duration, setDuration] = useState('7일분')
  const cetirizineDecision = checkMedication('cetirizine', medicationRuleSet)

  const medicationResults = useMemo(() => {
    const normalized = medicationQuery.trim()
    if (!normalized) return []
    return Object.keys(medicationRuleSet.medications)
      .map((id) => checkMedication(id, medicationRuleSet))
      .filter(({ name }) => name.includes(normalized))
  }, [medicationQuery])

  const diagnosisResults = diagnosisQuery.trim()
    ? diagnosisCandidates.filter(({ name, code }) => `${name} ${code}`.includes(diagnosisQuery.trim()))
    : []

  const confirmOrder = () => {
    const prescription: PrescriptionOrder = {
      medicationId: 'cetirizine',
      name: '세티리진염산염',
      strength: '10mg',
      instructions: `${dose}, ${frequency} ${timing}, ${duration}`,
    }
    saveOrder(diagnosis, prescription)
  }

  return (
    <main className="orders-page">
      <header className="orders-header">
        <button type="button" aria-label="진료 화면으로 돌아가기" onClick={() => navigate('/doctor/visit')}>‹</button>
        <div><span className="eyebrow">PRESCRIPTION SAFETY · DEMO</span><h1>처방·오더</h1><p>진단과 약품의 시연용 제한 상태를 확인한 뒤 저장하세요.</p></div>
        <span className="recording-chip"><i aria-hidden="true">●</i> 가상 환자 P-042</span>
      </header>
      <div className="orders-layout">
        <div className="order-main-column">
          <section className="order-section diagnosis-order-section">
            <div className="order-section-title"><span>01</span><div><small>DIAGNOSIS</small><h2>확정 진단</h2></div></div>
            <div className="selected-diagnosis"><span aria-hidden="true">✓</span><div><strong>{diagnosis.name} ({diagnosis.code})</strong><small>진단 후보 또는 검색에서 선택됨</small></div><button type="button" onClick={() => setDiagnosisQuery('알레르기')}>변경</button></div>
            <label className="order-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="진단명 검색" value={diagnosisQuery} onChange={(event) => setDiagnosisQuery(event.target.value)} placeholder="진단명 또는 KCD 코드 검색" /></label>
            {diagnosisResults.length > 0 && <div className="search-result-list">{diagnosisResults.map((item) => <button type="button" key={item.id} onClick={() => { setDiagnosis({ id: item.id, name: item.name, code: item.code }); setDiagnosisQuery('') }}><span><strong>{item.name}</strong><small>{item.code}</small></span><b>선택</b></button>)}</div>}
          </section>

          <section className="order-section medication-order-section">
            <div className="order-section-title"><span>02</span><div><small>MEDICATION</small><h2>처방</h2></div></div>
            <article className="prescription-card">
              <header><div><span className="medication-icon" aria-hidden="true">Rx</span><div><h3>세티리진염산염 10mg</h3><p>항히스타민제 · 시연 오더</p></div></div><span className="restriction-badge allowed"><i aria-hidden="true">✓</i> 제한 확인 완료</span></header>
              <div className="order-fields"><label>용량<input value={dose} onChange={(event) => setDose(event.target.value)} /></label><label>횟수<input value={frequency} onChange={(event) => setFrequency(event.target.value)} /></label><label>복용 시점<input value={timing} onChange={(event) => setTiming(event.target.value)} /></label><label>기간<input value={duration} onChange={(event) => setDuration(event.target.value)} /></label></div>
              <MedicationEvidence decision={cetirizineDecision} />
            </article>
            <label className="order-search medication-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="약품 검색" value={medicationQuery} onChange={(event) => setMedicationQuery(event.target.value)} placeholder="추가 약품명 검색" /></label>
            {medicationResults.length > 0 && <div className="medication-results">{medicationResults.map((decision) => <article className={decision.status} key={decision.medicationId}><div className="medication-result-head"><div><strong>{decision.name}</strong><span className={`restriction-badge ${decision.status}`}>{statusCopy[decision.status]}</span></div><button type="button" disabled={decision.status === 'prohibited'} aria-label={decision.status === 'prohibited' ? `${decision.name} 선택 불가` : `${decision.name} 선택`}>{decision.status === 'prohibited' ? '선택 불가' : '추가'}</button></div><p>{decision.status === 'prohibited' ? '향정신성의약품 · 비대면 처방 금지' : decision.reason}</p><MedicationEvidence decision={decision} /></article>)}</div>}
          </section>

          <section className="order-section followup-section"><div className="order-section-title"><span>03</span><div><small>FOLLOW-UP</small><h2>추적 관찰</h2></div></div><label className="check-order"><input type="checkbox" defaultChecked /><span><strong>7일 후 증상 확인</strong><small>앱 알림 · 시연 전용</small></span></label><label className="check-order"><input type="checkbox" defaultChecked /><span><strong>증상 악화 시 대면 전환</strong><small>발열, 호흡곤란, 안면 통증 발생 시</small></span></label></section>
        </div>
        <aside className="order-summary-panel">
          <span className="eyebrow">ORDER SUMMARY</span><h2>저장 전 확인</h2>
          <dl><div><dt>환자</dt><dd>김하늘 · 42세</dd></div><div><dt>진단</dt><dd>{diagnosis.code}</dd></div><div><dt>처방</dt><dd>세티리진 10mg</dd></div><div><dt>진료 형태</dt><dd>비대면 재진</dd></div></dl>
          <div className="safety-summary"><span aria-hidden="true">✓</span><p><strong>금지 약품 없음</strong><br />현재 오더의 시연용 제한 검사를 통과했습니다.</p></div>
          <p className="order-disclaimer">실제 DUR·HIRA·EMR 조회가 아닌 날짜 고정 fixture입니다. 구체적인 임상 처방을 권고하지 않습니다.</p>
          <button className="primary-button" type="button" onClick={confirmOrder}>처방·오더 확정</button>
          {state.orderSaved && <button className="patient-result-link" type="button" onClick={() => navigate('/patient/result')}>환자 결과 화면 보기 <span aria-hidden="true">→</span></button>}
        </aside>
      </div>
    </main>
  )
}

function MedicationEvidence({ decision }: { decision: MedicationDecision }) {
  return (
    <div className={`medication-evidence ${decision.status}`}>
      <div><span className={`restriction-badge ${decision.status}`}>{statusCopy[decision.status]}</span><strong>{decision.source} · {decision.asOf}</strong></div>
      <p>{decision.reason}</p>
      <a href={decision.evidenceUrl} target="_blank" rel="noreferrer">근거 안내 보기 <span aria-hidden="true">↗</span></a>
    </div>
  )
}
