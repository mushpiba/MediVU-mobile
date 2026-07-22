import { useNavigate } from 'react-router-dom'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

export function PatientResult() {
  const navigate = useNavigate()
  const { state } = useDemoEncounter()
  const diagnosis = state.confirmedDiagnosis ?? { id: 'allergic-rhinitis', name: '알레르기 비염, 상세불명', code: 'J30.4' }
  const prescription = state.prescription ?? { medicationId: 'cetirizine', name: '세티리진염산염', strength: '10mg', instructions: '1회 1정, 1일 1회 취침 전, 7일분' }

  return (
    <main className="patient-shell patient-result-screen">
      <section className="result-hero">
        <span className="result-mark" aria-hidden="true">✓</span>
        <span className="eyebrow">VISIT COMPLETE</span>
        <h1>진료 결과가 도착했습니다</h1>
        <p>이서준 의사가 진단과 처방을 확정했어요.</p>
      </section>
      <section className="result-doctor-card"><span aria-hidden="true">이</span><div><strong>이서준 의사</strong><small>해솔가정의학과의원 · 2026.07.22</small></div><i>진료 완료</i></section>
      <section className="patient-result-card"><div className="patient-result-title"><span>01</span><div><small>CONFIRMED DIAGNOSIS</small><h2>확정 진단</h2></div></div><div className="final-diagnosis"><span aria-hidden="true">D</span><div><strong>{diagnosis.name}</strong><small>{diagnosis.code}</small></div></div><p>의사가 확정한 결과만 표시합니다. 진단 후보나 AI 순위는 환자 화면에 제공하지 않습니다.</p></section>
      <section className="patient-result-card"><div className="patient-result-title"><span>02</span><div><small>PRESCRIPTION</small><h2>처방</h2></div></div><div className="final-medication"><span aria-hidden="true">Rx</span><div><strong>{prescription.name} {prescription.strength}</strong><small>{prescription.instructions}</small></div></div></section>
      <div className="result-safety-note"><span aria-hidden="true">!</span><p>복용 중 불편함이 있거나 증상이 악화되면 의료기관에 문의하세요. 이 화면은 시연용이며 의료 조언이 아닙니다.</p></div>
      <button className="primary-button" type="button" onClick={() => navigate('/patient/prescription')}>전자처방전 보기 <span aria-hidden="true">→</span></button>
    </main>
  )
}
