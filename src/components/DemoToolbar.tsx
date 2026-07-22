import { useNavigate } from 'react-router-dom'
import { useDemoEncounter } from '../state/DemoEncounterContext'

export function DemoToolbar() {
  const navigate = useNavigate()
  const { resetNotice, resetDemo } = useDemoEncounter()

  const reset = () => {
    resetDemo()
    navigate('/patient/home')
  }

  return (
    <header className="demo-toolbar">
      <div className="demo-brand">
        <span className="demo-mark" aria-hidden="true">MV</span>
        <span><small>CLICKABLE DEMO</small>MediVU Mobile</span>
      </div>
      <nav aria-label="데모 역할 전환">
        <button type="button" onClick={() => navigate('/patient/home')}>환자 보기</button>
        <button type="button" onClick={() => navigate('/doctor/schedule')}>의사 보기</button>
        <button type="button" className="reset-button" onClick={reset}>전체 초기화</button>
      </nav>
      <span className="visually-hidden" role="status">{resetNotice}</span>
    </header>
  )
}

