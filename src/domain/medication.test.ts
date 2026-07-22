import { checkMedication } from './medication'
import { medicationRuleSet } from '../data/medicationRules'

describe('checkMedication', () => {
  it.each([
    ['cetirizine', 'allowed'],
    ['prednisolone', 'conditional'],
    ['zolpidem', 'prohibited'],
  ] as const)('returns the fixed demo restriction for %s', (medicationId, expectedStatus) => {
    const result = checkMedication(medicationId, medicationRuleSet)

    expect(result.status).toBe(expectedStatus)
    expect(result.source).toBe('HIRA demo snapshot')
    expect(result.asOf).toBe('2026-07-22')
    expect(result.evidenceUrl).toMatch(/^https:\/\//)
  })

  it('fails closed when the medication is outside the demo fixture', () => {
    expect(checkMedication('unknown-drug', medicationRuleSet)).toEqual(
      expect.objectContaining({ status: 'prohibited', reason: '시연 규칙에 없는 약품은 선택할 수 없습니다.' }),
    )
  })
})
