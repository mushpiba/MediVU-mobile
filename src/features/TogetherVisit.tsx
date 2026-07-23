import { DoctorVisit } from './doctor/DoctorVisit'
import { PatientVisit } from './patient/PatientVisit'

export function TogetherVisit() {
  return (
    <main className="together-view">
      <section className="together-pane patient-pane" aria-labelledby="patient-preview-title">
        <header className="together-pane-header">
          <span className="together-pane-dot patient" aria-hidden="true" />
          <div>
            <small>PATIENT VIEW</small>
            <h1 id="patient-preview-title">환자 화면</h1>
          </div>
        </header>
        <PatientVisit embedded />
      </section>

      <section className="together-pane doctor-pane" aria-labelledby="doctor-preview-title">
        <header className="together-pane-header">
          <span className="together-pane-dot doctor" aria-hidden="true" />
          <div>
            <small>DOCTOR VIEW</small>
            <h1 id="doctor-preview-title">의사 화면</h1>
          </div>
        </header>
        <DoctorVisit embedded />
      </section>
    </main>
  )
}
