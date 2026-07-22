import { useNavigate } from 'react-router-dom'
import { demoClinic } from '../../data/demoData'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

export function PatientWaiting() {
  const navigate = useNavigate()
  const { state } = useDemoEncounter()

  return (
    <main className="patient-shell waiting-screen">
      <section className="waiting-content">
        <div className="waiting-pulse" aria-hidden="true"><span>이</span></div>
        <span className="live-pill"><span aria-hidden="true">●</span> 연결 준비 완료</span>
        <h1>의사 선생님이 곧 연결됩니다</h1>
        <p>{demoClinic.name}<br />이서준 의사 · {state.appointmentTime ?? '오후 2:30'}</p>
        <div className="device-checks">
          <div><span aria-hidden="true">⌾</span><strong>카메라</strong><small>시뮬레이션 준비됨</small><b>✓</b></div>
          <div><span aria-hidden="true">◖</span><strong>마이크</strong><small>시뮬레이션 준비됨</small><b>✓</b></div>
          <div><span aria-hidden="true">◉</span><strong>네트워크</strong><small>연결 상태 좋음</small><b>✓</b></div>
        </div>
        <p className="clinical-caveat">실제 카메라와 마이크는 사용하지 않는 클릭형 데모입니다.</p>
        <button className="primary-button" type="button" onClick={() => navigate('/patient/visit')}>진료실 입장하기</button>
      </section>
    </main>
  )
}
