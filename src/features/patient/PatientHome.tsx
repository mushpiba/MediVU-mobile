import { useNavigate } from 'react-router-dom'
import { demoClinic, demoPatient } from '../../data/demoData'

export function PatientHome() {
  const navigate = useNavigate()

  return (
    <main className="patient-shell home-screen">
      <h1 className="visually-hidden">환자 홈</h1>
      <header className="patient-greeting">
        <div>
          <span className="eyebrow">MEDIVU CARE</span>
          <h2>안녕하세요, {demoPatient.name}님</h2>
          <p>다니던 병원의 재진을 편하게 이어보세요.</p>
        </div>
        <button className="profile-avatar" type="button" aria-label="내 정보">김</button>
      </header>

      <section className="hero-care-card" aria-labelledby="telemedicine-title">
        <span className="status-pill"><span aria-hidden="true">●</span> 재진 기록 확인됨</span>
        <h2 id="telemedicine-title">비대면 재진을<br />시작할까요?</h2>
        <p>앱이 예약 가능 여부를 먼저 확인해 드려요.</p>
        <button className="primary-button light-button" type="button" onClick={() => navigate('/patient/eligibility')}>
          비대면 재진 시작하기 <span aria-hidden="true">→</span>
        </button>
        <div className="hero-orbit" aria-hidden="true"><span>+</span></div>
      </section>

      <section className="section-block" aria-labelledby="recent-care-title">
        <div className="section-heading">
          <div><span className="eyebrow">RECENT CARE</span><h2 id="recent-care-title">최근 다녀온 병원</h2></div>
          <button type="button" className="text-button">전체 보기</button>
        </div>
        <article className="clinic-summary-card">
          <div className="clinic-icon" aria-hidden="true">✚</div>
          <div className="clinic-copy">
            <h3>{demoClinic.name}</h3>
            <p>{demoClinic.specialty}</p>
            <div className="clinic-meta"><span>{demoPatient.previousDiagnosis}</span><span>{demoPatient.previousVisitDate}</span></div>
          </div>
          <span className="chevron" aria-hidden="true">›</span>
        </article>
      </section>

      <section className="notice-card">
        <span className="notice-icon" aria-hidden="true">i</span>
        <div><strong>시연용 미래 정책 화면입니다</strong><p>실제 예약·진료·처방을 제공하지 않습니다.</p></div>
      </section>

      <nav className="patient-bottom-nav" aria-label="환자 앱 메뉴">
        <button type="button" className="active"><span aria-hidden="true">⌂</span>홈</button>
        <button type="button"><span aria-hidden="true">▣</span>진료 내역</button>
        <button type="button"><span aria-hidden="true">♙</span>내 정보</button>
      </nav>
    </main>
  )
}
