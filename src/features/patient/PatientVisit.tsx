import { useRef, useState } from 'react'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

export function PatientVisit() {
  const { state, playTranscript, addPatientNote } = useDemoEncounter()
  const [expanded, setExpanded] = useState(false)
  const [note, setNote] = useState('')
  const dragStart = useRef<number | null>(null)

  const submitNote = () => {
    if (!note.trim()) return
    addPatientNote(note)
    setNote('')
  }

  return (
    <main className="patient-visit-screen">
      <h1 className="visually-hidden">비대면 진료</h1>
      <section className="video-stage" aria-label="가상 영상 통화">
        <div className="call-topbar"><span className="call-secure"><i aria-hidden="true">●</i> 암호화된 진료</span><span>04:18</span></div>
        <div className="doctor-video simulated-video">
          <span className="doctor-portrait" aria-hidden="true">이</span>
          <div className="video-name"><strong>이서준 의사</strong><small>해솔가정의학과의원</small></div>
        </div>
        <div className="self-video simulated-video"><span aria-hidden="true">김</span><small>나</small></div>
        <div className="call-controls" aria-label="통화 제어">
          <button type="button" aria-label="마이크 끄기">◖</button>
          <button type="button" aria-label="카메라 끄기">⌾</button>
          <button type="button" className="end-call" aria-label="통화 종료">⌒</button>
          <button type="button" aria-label="스피커 설정">◉</button>
        </div>
        <button className="play-demo-button" type="button" onClick={playTranscript}>진료 재생</button>
      </section>

      <section
        className={`consultation-sheet ${expanded ? 'expanded' : ''}`}
        data-testid="consultation-sheet"
        onPointerDown={(event) => { dragStart.current = event.clientY }}
        onPointerUp={(event) => {
          if (dragStart.current !== null && dragStart.current - event.clientY > 60) setExpanded(true)
          if (dragStart.current !== null && event.clientY - dragStart.current > 60) setExpanded(false)
          dragStart.current = null
        }}
      >
        <button className="sheet-toggle" type="button" aria-expanded={expanded} aria-label={expanded ? '진료 내용 접기' : '진료 내용 펼치기'} onClick={() => setExpanded((value) => !value)}>
          <span className="sheet-handle" aria-hidden="true" />
          <span><b>실시간 진료 기록</b><small>{state.transcriptEvents.length ? `${state.transcriptEvents.length}개 대화 · ${state.keywords.length}개 키워드` : '위로 밀어 진료 내용을 확인하세요'}</small></span>
          <i aria-hidden="true">{expanded ? '⌄' : '⌃'}</i>
        </button>
        <div className="sheet-scroll">
          <section className="visit-panel transcript-panel" aria-labelledby="transcript-title">
            <div className="panel-title"><span><i aria-hidden="true">●</i> LIVE</span><h2 id="transcript-title">실시간 전사</h2></div>
            {state.transcriptEvents.length ? (
              <div className="transcript-list">{state.transcriptEvents.map((event) => <article className={event.speaker} key={event.id}><div><strong>{event.speakerLabel}</strong><time>{event.time}</time></div><p>{event.text}</p></article>)}</div>
            ) : <p className="empty-copy">진료 재생을 누르면 가상 대화가 시작됩니다.</p>}
          </section>
          <section className="visit-panel" aria-labelledby="keyword-title">
            <div className="panel-title"><span>AI DEMO</span><h2 id="keyword-title">임상 키워드</h2></div>
            <div className="keyword-cloud">
              {state.keywords.length ? state.keywords.map((keyword) => <span className={`keyword-chip ${keyword.source}`} key={keyword.id}><i aria-hidden="true">{keyword.source === 'history' ? 'H' : 'A'}</i>{keyword.label}<small>{keyword.source === 'history' ? '과거력' : '대화'}</small></span>) : <p className="empty-copy">대화에서 주요 증상을 정리합니다.</p>}
            </div>
          </section>
          <section className="visit-panel note-panel" aria-labelledby="patient-note-title">
            <div className="panel-title"><span>PATIENT</span><h2 id="patient-note-title">놓친 정보 전달</h2></div>
            <p>말하지 못한 증상이나 요청을 의사에게 바로 남겨보세요.</p>
            <label htmlFor="patient-note" className="visually-hidden">환자 메모 입력</label>
            <div className="note-composer"><textarea id="patient-note" aria-label="환자 메모 입력" value={note} onChange={(event) => setNote(event.target.value)} placeholder="예: 밤에 코막힘이 더 심해요" /><button type="button" onClick={submitNote}>의사에게 전달</button></div>
            <div className="patient-note-list">{state.patientNotes.map((item, index) => <span key={`${item}-${index}`}><i aria-hidden="true">P</i>환자 전달 · {item}</span>)}</div>
            <div className="patient-note-list doctor-message-list">{state.doctorNotes.map((item, index) => <span key={`${item}-${index}`}><i aria-hidden="true">D</i>의사 전달 · {item}</span>)}</div>
          </section>
        </div>
      </section>
    </main>
  )
}
