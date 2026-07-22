import { scoreDiagnoses } from './diagnosis'
import type { DiagnosisCandidate, Keyword } from './types'

const candidates: DiagnosisCandidate[] = [
  { id: 'allergic-rhinitis', name: '알레르기 비염, 상세불명', code: 'J30.4', baseScore: 42, keywordWeights: { 재채기: 18, '맑은 콧물': 20, 코막힘: 12 } },
  { id: 'vasomotor-rhinitis', name: '혈관운동성 비염', code: 'J30.0', baseScore: 29, keywordWeights: { '맑은 콧물': 16 } },
  { id: 'common-cold', name: '급성 비인두염', code: 'J00', baseScore: 26, keywordWeights: { 코막힘: 10 } },
  { id: 'sinusitis', name: '급성 부비동염', code: 'J01.9', baseScore: 18, keywordWeights: { 코막힘: 12 } },
  { id: 'influenza', name: '인플루엔자', code: 'J11.1', baseScore: 9, keywordWeights: { 발열: 50 } },
  { id: 'asthma', name: '천식 악화', code: 'J45.901', baseScore: 4, keywordWeights: { 호흡곤란: 60 } },
]

const keywords: Keyword[] = [
  { id: '1', label: '재채기', source: 'ambient' },
  { id: '2', label: '맑은 콧물', source: 'ambient' },
  { id: '3', label: '재채기', source: 'doctor' },
  { id: '4', label: '임의 메모', source: 'patient' },
]

describe('scoreDiagnoses', () => {
  it('deduplicates keywords, clamps independent scores, sorts, and returns Top 5', () => {
    const result = scoreDiagnoses(keywords, candidates)

    expect(result).toHaveLength(5)
    expect(result[0]).toEqual(expect.objectContaining({ id: 'allergic-rhinitis', score: 80 }))
    expect(result.map(({ score }) => score)).toEqual([...result.map(({ score }) => score)].sort((a, b) => b - a))
    expect(result.every(({ score }) => score >= 1 && score <= 99)).toBe(true)
  })

  it('removes a keyword from diagnostic evidence without deleting its source record', () => {
    const withRunnyNose = scoreDiagnoses(keywords, candidates)[0]
    const withoutRunnyNose = scoreDiagnoses(keywords.filter(({ label }) => label !== '맑은 콧물'), candidates)[0]

    expect(withRunnyNose.score).toBeGreaterThan(withoutRunnyNose.score)
    expect(withoutRunnyNose.matchedKeywords).not.toContain('맑은 콧물')
  })
})
