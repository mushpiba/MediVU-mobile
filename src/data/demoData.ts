import type { DemoClinic, DemoPatient, EligibilityProfile, EligibilityRuleSet, Keyword, TranscriptEvent } from '../domain/types'

export const demoPatient: DemoPatient = {
  id: 'P-042',
  name: '김하늘',
  age: 42,
  sex: '여성',
  residence: '해솔도',
  previousDiagnosis: '알레르기 비염',
  previousVisitDate: '2026-04-18',
}

export const demoClinic: DemoClinic = {
  id: 'haesol-family',
  name: '해솔가정의학과의원',
  specialty: '가정의학과 · 재진 가능',
  distance: '해솔도 내 2.4km',
}

export const eligibilityProfile: EligibilityProfile = {
  identityVerified: true,
  hasVerifiedRevisit: true,
  clinicTelemedicineEnabled: true,
}

export const eligibilityRuleSet: EligibilityRuleSet = {
  name: 'FUTURE POLICY DEMO',
  asOf: '2026-07-22',
}

export const appointmentTimes = ['오후 2:00', '오후 2:30', '오후 3:00'] as const

export const demoTranscript: TranscriptEvent[] = [
  { id: 't1', speaker: 'doctor', speakerLabel: '이서준 의사', time: '14:31', text: '하늘님, 지난번 비염 증상이 다시 시작됐나요?' },
  { id: 't2', speaker: 'patient', speakerLabel: '김하늘 환자', time: '14:31', text: '요즘 재채기와 맑은 콧물이 계속 나요.' },
  { id: 't3', speaker: 'doctor', speakerLabel: '이서준 의사', time: '14:32', text: '열이나 숨이 차는 증상은 없으신가요?' },
  { id: 't4', speaker: 'patient', speakerLabel: '김하늘 환자', time: '14:32', text: '열은 없고 밤에는 코막힘이 더 심해져요.' },
]

export const demoKeywords: Keyword[] = [
  { id: 'k1', label: '재채기', source: 'ambient' },
  { id: 'k2', label: '맑은 콧물', source: 'ambient' },
  { id: 'k3', label: '코막힘', source: 'ambient' },
  { id: 'k4', label: '발열 없음', source: 'ambient' },
  { id: 'k5', label: '알레르기 비염 재진', source: 'history' },
]
