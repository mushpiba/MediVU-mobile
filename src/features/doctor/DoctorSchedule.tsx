import { useNavigate } from 'react-router-dom'
import { demoPatient } from '../../data/demoData'

export function DoctorSchedule() {
  const navigate = useNavigate()

  return (
    <main className="doctor-page doctor-schedule-page">
      <header className="doctor-page-header">
        <div><span className="eyebrow">WED · JUL 22</span><h1>오늘의 비대면 일정</h1><p>안녕하세요, 이서준 의사님. 예정된 재진을 확인하세요.</p></div>
        <div className="doctor-avatar">이</div>
      </header>
      <section className="schedule-overview" aria-label="오늘 일정 요약">
        <div><strong>3</strong><span>전체 예약</span></div><div className="active"><strong>1</strong><span>곧 시작</span></div><div><strong>2</strong><span>완료</span></div>
      </section>
      <section className="doctor-section">
        <div className="section-heading"><div><span className="eyebrow">UP NEXT</span><h2>다음 진료</h2></div><span className="alert-chip"><i aria-hidden="true">●</i> 10분 후 진료</span></div>
        <article className="next-patient-card">
          <div className="timeline-time"><strong>14:30</strong><span>비대면</span></div>
          <div className="patient-photo" aria-hidden="true">김</div>
          <div className="patient-card-copy"><h3>{demoPatient.name}</h3><p>{demoPatient.age}세 · {demoPatient.sex} · 재진</p><div><span>알레르기 비염</span><span>해솔도</span></div></div>
          <button type="button" aria-label={`${demoPatient.name} 환자 보기`} onClick={() => navigate('/doctor/patient')}>환자 확인 <span aria-hidden="true">→</span></button>
        </article>
      </section>
      <section className="doctor-section muted-schedule"><div className="section-heading"><div><span className="eyebrow">COMPLETED</span><h2>완료된 진료</h2></div></div><div className="compact-appointment"><time>11:00</time><span>박은호 · 고혈압 재진</span><b>완료</b></div><div className="compact-appointment"><time>13:20</time><span>최유진 · 당뇨병 재진</span><b>완료</b></div></section>
    </main>
  )
}
