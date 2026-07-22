import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DemoToolbar } from './components/DemoToolbar'
import { PatientEligibility } from './features/patient/PatientEligibility'
import { PatientHome } from './features/patient/PatientHome'
import { DemoEncounterProvider } from './state/DemoEncounterContext'

function PlaceholderScreen({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <main className="placeholder-screen">
      <section className="placeholder-card">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>가상 비대면 재진 흐름을 준비하고 있습니다.</p>
      </section>
    </main>
  )
}

export function App() {
  return (
    <HashRouter>
      <DemoEncounterProvider>
        <div className="app-root">
          <DemoToolbar />
          <Routes>
            <Route path="/patient/home" element={<PatientHome />} />
            <Route path="/patient/eligibility" element={<PatientEligibility />} />
            <Route path="/patient/schedule" element={<PlaceholderScreen eyebrow="PATIENT APP" title="예약 시간 선택" />} />
            <Route path="/doctor/schedule" element={<PlaceholderScreen eyebrow="DOCTOR APP" title="오늘의 비대면 일정" />} />
            <Route path="*" element={<Navigate replace to="/patient/home" />} />
          </Routes>
        </div>
      </DemoEncounterProvider>
    </HashRouter>
  )
}
