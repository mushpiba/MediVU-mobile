import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { diagnosisCandidates, pastVisits } from '../../data/demoData'
import { scoreDiagnoses } from '../../domain/diagnosis'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

type DoctorTab = 'transcript' | 'clinical' | 'history'

export function DoctorVisit({ embedded = false }: { embedded?: boolean }) {
  const navigate = useNavigate()
  const { state, playTranscript, addDoctorNote, removeKeyword } = useDemoEncounter()
  const [activeTab, setActiveTab] = useState<DoctorTab>('clinical')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [doctorNote, setDoctorNote] = useState('')
  const diagnoses = useMemo(() => scoreDiagnoses(state.keywords, diagnosisCandidates), [state.keywords])
  const Root = embedded ? 'div' : 'main'

  const submitDoctorNote = () => {
    if (!doctorNote.trim()) return
    addDoctorNote(doctorNote)
    setDoctorNote('')
  }

  return (
    <Root className="doctor-workspace">
      <header className="workspace-header">
        <div><span className="eyebrow">LIVE VISIT · 04:18</span><h1>김하늘 환자 비대면 진료</h1></div>
        <div className="workspace-actions"><span className="recording-chip"><i aria-hidden="true">●</i> 전사 중</span><button type="button" aria-label="과거력 열기" onClick={() => setHistoryOpen(true)}>과거력</button><button className="face-to-face" type="button">대면 전환</button></div>
      </header>
      <nav className="doctor-mobile-tabs" aria-label="의사 진료 화면 탭">
        <button type="button" className={activeTab === 'transcript' ? 'active' : ''} onClick={() => setActiveTab('transcript')}>전사</button>
        <button type="button" className={activeTab === 'clinical' ? 'active' : ''} onClick={() => setActiveTab('clinical')}>진단·키워드</button>
        <button type="button" className={activeTab === 'history' ? 'active' : ''} onClick={() => { setActiveTab('history'); setHistoryOpen(true) }}>과거력</button>
      </nav>
      <div className="doctor-workspace-grid">
        <section className={`doctor-left-column ${activeTab !== 'transcript' ? 'mobile-inactive' : ''}`}>
          <div className="doctor-call-video">
            <div className="patient-video-portrait" aria-hidden="true">김</div><div className="video-name"><strong>김하늘 환자</strong><small>연결 상태 좋음</small></div>
            <div className="doctor-self-view"><span aria-hidden="true">이</span><small>나</small></div>
            <div className="mini-call-controls"><button type="button" aria-label="마이크 끄기">◖</button><button type="button" aria-label="카메라 끄기">⌾</button><button type="button" className="end-call" aria-label="통화 종료">⌒</button></div>
          </div>
          <section className="doctor-transcript"><div className="workspace-panel-heading"><div><span className="live-dot">● LIVE</span><h2>실시간 전사</h2></div><button type="button" onClick={playTranscript}>대화 시뮬레이션 재생</button></div>{state.transcriptEvents.length ? <div className="transcript-list">{state.transcriptEvents.map((event) => <article className={event.speaker} key={event.id}><div><strong>{event.speakerLabel}</strong><time>{event.time}</time></div><p>{event.text}</p></article>)}</div> : <p className="empty-copy">재생 버튼을 눌러 시연 대화를 시작하세요.</p>}</section>
        </section>

        <section className={`doctor-right-column ${activeTab !== 'clinical' ? 'mobile-inactive' : ''}`}>
          <section className="workspace-panel keyword-workspace"><div className="workspace-panel-heading"><div><span>CLINICAL SIGNALS</span><h2>임상 키워드</h2></div><small>근거에서 제외 가능</small></div><div className="keyword-cloud">{state.keywords.length ? state.keywords.map((keyword) => <span className={`keyword-chip ${keyword.source}`} key={keyword.id}><i aria-hidden="true">{keyword.source === 'history' ? 'H' : 'A'}</i>{keyword.label}<small>{keyword.source === 'history' ? '과거력' : '대화'}</small><button type="button" aria-label={`${keyword.label} 진단 근거에서 제외`} onClick={() => removeKeyword(keyword.id)}>×</button></span>) : <button className="inline-play" type="button" onClick={playTranscript}>대화를 재생해 키워드 추출</button>}</div></section>
          <section className="workspace-panel shared-note-panel"><div className="workspace-panel-heading"><div><span>SHARED NOTES</span><h2>환자·의사 전달</h2></div></div><div className="shared-note-list">{state.patientNotes.map((note, index) => <span className="patient-source" key={`${note}-${index}`}><i aria-hidden="true">P</i>환자 전달 · {note}</span>)}{state.doctorNotes.map((note, index) => <span className="doctor-source" key={`${note}-${index}`}><i aria-hidden="true">D</i>의사 전달 · {note}</span>)}{!state.patientNotes.length && !state.doctorNotes.length && <p className="empty-copy">아직 추가 전달 내용이 없습니다.</p>}</div><div className="doctor-note-composer"><input aria-label="의사 메모 입력" value={doctorNote} onChange={(event) => setDoctorNote(event.target.value)} placeholder="환자에게 전달할 내용을 입력하세요" /><button type="button" onClick={submitDoctorNote}>전달</button></div></section>
          <section className="workspace-panel diagnosis-panel"><div className="workspace-panel-heading"><div><span>DECISION SUPPORT · DEMO</span><h2>진단 후보 Top 5</h2></div><small>독립 확률</small></div><ol className="diagnosis-list">{diagnoses.map((diagnosis, index) => <li key={diagnosis.id}><button type="button" onClick={() => navigate(`/doctor/orders?diagnosis=${diagnosis.id}`)}><span className="diagnosis-rank">{index + 1}</span><span className="diagnosis-copy"><strong>{diagnosis.name}</strong><small>{diagnosis.code} · 근거 {diagnosis.matchedKeywords.length || '기본'}개</small></span><span className="diagnosis-score"><b>{diagnosis.score}%</b><i style={{ width: `${diagnosis.score}%` }} /></span><span className="chevron" aria-hidden="true">›</span></button></li>)}</ol><p className="ai-caveat">후보 순위는 발표용 fixture이며 의료 판단이나 실제 확률이 아닙니다.</p></section>
        </section>
      </div>
      {historyOpen && <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setHistoryOpen(false) }}><aside className="history-drawer" aria-label="과거 진료 기록"><header><div><span className="eyebrow">LONGITUDINAL RECORD</span><h2>과거 진료 기록</h2></div><button type="button" aria-label="과거력 닫기" onClick={() => setHistoryOpen(false)}>×</button></header><div className="history-patient"><span aria-hidden="true">김</span><div><strong>김하늘</strong><small>42세 · 여성 · P-042</small></div></div><div className="history-timeline">{pastVisits.map((visit) => <article key={visit.date}><time>{visit.date}</time><span>{visit.type}</span><h3>{visit.diagnosis}</h3><p>{visit.note}</p></article>)}</div><section className="history-summary"><span>KNOWN HISTORY</span><div><b>알레르기</b><p>집먼지진드기 의심</p></div><div><b>복용력</b><p>세티리진 복용 경험</p></div></section></aside></div>}
    </Root>
  )
}
