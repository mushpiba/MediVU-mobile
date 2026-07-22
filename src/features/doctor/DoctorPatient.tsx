import { useNavigate } from 'react-router-dom'
import { demoClinic, demoPatient, pastVisits } from '../../data/demoData'

export function DoctorPatient() {
  const navigate = useNavigate()
  return (
    <main className="doctor-page doctor-patient-page">
      <header className="doctor-flow-header"><button type="button" aria-label="일정으로 돌아가기" onClick={() => navigate('/doctor/schedule')}>‹</button><div><span className="eyebrow">PATIENT CHECK</span><h1>재진 환자 확인</h1></div><span className="alert-chip"><i aria-hidden="true">●</i> 대기 중</span></header>
      <section className="patient-profile-hero">
        <div className="large-patient-photo" aria-hidden="true">김</div>
        <div><span className="status-pill dark-text"><i aria-hidden="true">✓</i> 본인 확인 완료</span><h2>{demoPatient.name}</h2><p>{demoPatient.age}세 · {demoPatient.sex} · {demoPatient.residence} 거주</p></div>
      </section>
      <div className="patient-check-grid">
        <section className="verification-card"><div className="card-label"><span>REVISIT EVIDENCE</span><b>확인됨</b></div><h2>비대면 재진 근거</h2><div className="evidence-list"><div><i aria-hidden="true">✓</i><span><strong>본인 확인</strong><small>가상 인증 완료</small></span></div><div><i aria-hidden="true">✓</i><span><strong>2026-04-18 대면 진료</strong><small>{demoClinic.name}</small></span></div><div><i aria-hidden="true">✓</i><span><strong>동일 증상 재진</strong><small>알레르기 비염 증상 재발</small></span></div></div></section>
        <section className="verification-card"><div className="card-label"><span>CHIEF CONCERN</span></div><h2>예약 시 입력</h2><blockquote>“재채기와 맑은 콧물, 코막힘이 다시 시작됐어요.”</blockquote><dl><div><dt>최근 진단</dt><dd>{pastVisits[0].diagnosis}</dd></div><div><dt>발열·호흡곤란</dt><dd>없음</dd></div></dl></section>
      </div>
      <div className="policy-callout"><i aria-hidden="true">i</i><p><strong>행정적 예약 가능 상태</strong><br />진료 중 의학적 판단에 따라 언제든 대면 진료로 전환할 수 있습니다.</p></div>
      <button className="primary-button doctor-start-button" type="button" onClick={() => navigate('/doctor/visit')}>대기 승인하고 진료 열기 <span aria-hidden="true">→</span></button>
    </main>
  )
}
