import { demoEncounterReducer, initialDemoEncounterState } from './DemoEncounterContext'

describe('demo encounter reducer', () => {
  it('restores every shared consultation field on reset', () => {
    const changed = demoEncounterReducer(initialDemoEncounterState, {
      type: 'add-patient-note',
      note: '밤에 코막힘이 심해요',
    })

    expect(changed.patientNotes).toHaveLength(1)
    expect(demoEncounterReducer(changed, { type: 'reset' })).toEqual(initialDemoEncounterState)
  })
})
