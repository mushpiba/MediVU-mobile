import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { appointmentTimes, demoClinic } from '../../data/demoData'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

export function PatientSchedule() {
  const navigate = useNavigate()
  const { state, scheduleAppointment } = useDemoEncounter()
  const [selectedTime, setSelectedTime] = useState('오후 2:30')

  if (state.appointmentConfirmed) {
    return (
      <main className="patient-shell confirmation-screen">
        <section className="confirmation-content">
          <span className="result-mark" aria-hidden="true">✓</span>
          <span className="eyebrow">APPOINTMENT READY</span>
          <h1>예약이 완료되었습니다</h1>
          <p>진료 10분 전에 알림을 보내드릴게요.</p>
          <article className="appointment-ticket">
            <span className="ticket-date">7월 22일 · 수요일</span>
            <strong>{state.appointmentTime}</strong>
            <div><span className="clinic-icon" aria-hidden="true">✚</span><span><b>{demoClinic.name}</b><small>이서준 의사 · 비대면 재진</small></span></div>
          </article>
          <button className="primary-button" type="button" onClick={() => navigate('/patient/waiting')}>대기실로 이동 <span aria-hidden="true">→</span></button>
        </section>
      </main>
    )
  }

  return (
    <main className="patient-shell schedule-screen">
      <header className="flow-header">
        <button className="icon-button" type="button" aria-label="자격 확인으로 돌아가기" onClick={() => navigate('/patient/eligibility')}>‹</button>
        <div><span className="eyebrow">SCHEDULE</span><strong>진료 예약</strong></div>
      </header>
      <section className="schedule-content">
        <span className="flow-symbol" aria-hidden="true">▦</span>
        <h1>진료 시간을 선택해 주세요</h1>
        <p className="flow-lead">2026년 7월 22일 수요일 · {demoClinic.name}</p>
        <div className="date-strip" aria-label="날짜 선택">
          <button type="button"><small>화</small><b>21</b></button>
          <button type="button" className="selected"><small>수</small><b>22</b></button>
          <button type="button"><small>목</small><b>23</b></button>
          <button type="button"><small>금</small><b>24</b></button>
        </div>
        <h2>오후</h2>
        <div className="time-grid">
          {appointmentTimes.map((time) => (
            <button type="button" key={time} className={selectedTime === time ? 'selected' : ''} aria-label={`${time} 선택`} aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)}>{time}</button>
          ))}
        </div>
        <button className="primary-button schedule-confirm" type="button" onClick={() => scheduleAppointment(selectedTime)}>예약 확정하기</button>
      </section>
    </main>
  )
}
