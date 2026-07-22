import { useNavigate } from 'react-router-dom'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

export function PatientPrescription() {
  const navigate = useNavigate()
  const { state, setDeliveryStage } = useDemoEncounter()
  const diagnosis = state.confirmedDiagnosis ?? { id: 'allergic-rhinitis', name: '알레르기 비염, 상세불명', code: 'J30.4' }
  const prescription = state.prescription ?? { medicationId: 'cetirizine', name: '세티리진염산염', strength: '10mg', instructions: '1회 1정, 1일 1회 취침 전, 7일분' }

  const beginPharmacyJourney = () => {
    setDeliveryStage('eligibility')
    navigate('/patient/delivery')
  }

  return (
    <main className="patient-shell prescription-screen">
      <header className="flow-header"><button className="icon-button" type="button" aria-label="진료 결과로 돌아가기" onClick={() => navigate('/patient/result')}>‹</button><div><span className="eyebrow">E-PRESCRIPTION · DEMO</span><strong>전자처방전</strong></div><span className="verified-prescription">발급 완료</span></header>
      <section className="prescription-paper">
        <div className="paper-header"><div><span className="demo-mark">MV</span><div><h1>전자처방전</h1><p>시연용 · 실제 사용 불가</p></div></div><span>RX-260722-042</span></div>
        <div className="qr-demo" aria-label="시연용 처방전 코드"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <dl className="prescription-meta"><div><dt>환자</dt><dd>김하늘 · 42세 · 여성</dd></div><div><dt>의료기관</dt><dd>해솔가정의학과의원</dd></div><div><dt>처방의</dt><dd>이서준</dd></div><div><dt>발급일</dt><dd>2026-07-22</dd></div></dl>
        <div className="paper-diagnosis"><span>DIAGNOSIS</span><strong>{diagnosis.name}</strong><small>{diagnosis.code}</small></div>
        <div className="paper-medication"><span className="medication-icon" aria-hidden="true">Rx</span><div><strong>{prescription.name} {prescription.strength}</strong><p>{prescription.instructions}</p></div><b>1</b></div>
        <p className="paper-footnote">이 처방전은 가상 데이터로 만든 클릭형 데모이며 실제 약국 전송·조제에 사용할 수 없습니다.</p>
      </section>
      <button className="primary-button" type="button" onClick={beginPharmacyJourney}>약국 선택하기 <span aria-hidden="true">→</span></button>
    </main>
  )
}
