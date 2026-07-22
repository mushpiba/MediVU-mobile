import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DemoToolbar } from './components/DemoToolbar'
import { DoctorPatient } from './features/doctor/DoctorPatient'
import { DoctorSchedule } from './features/doctor/DoctorSchedule'
import { DoctorVisit } from './features/doctor/DoctorVisit'
import { PatientEligibility } from './features/patient/PatientEligibility'
import { PatientHome } from './features/patient/PatientHome'
import { PatientSchedule } from './features/patient/PatientSchedule'
import { PatientVisit } from './features/patient/PatientVisit'
import { PatientWaiting } from './features/patient/PatientWaiting'
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
            <Route path="/patient/schedule" element={<PatientSchedule />} />
            <Route path="/patient/waiting" element={<PatientWaiting />} />
            <Route path="/patient/visit" element={<PatientVisit />} />
            <Route path="/doctor/schedule" element={<DoctorSchedule />} />
            <Route path="/doctor/patient" element={<DoctorPatient />} />
            <Route path="/doctor/visit" element={<DoctorVisit />} />
            <Route path="/doctor/orders" element={<PlaceholderScreen eyebrow="DOCTOR APP" title="처방·오더" />} />
            <Route path="*" element={<Navigate replace to="/patient/home" />} />
          </Routes>
        </div>
      </DemoEncounterProvider>
    </HashRouter>
  )
}
