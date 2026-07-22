import { checkEligibility } from './eligibility'

const profile = {
  identityVerified: true,
  hasVerifiedRevisit: true,
  clinicTelemedicineEnabled: true,
}

const ruleSet = {
  name: 'FUTURE POLICY DEMO',
  asOf: '2026-07-22',
}

describe('checkEligibility', () => {
  it('confirms scheduling eligibility for a verified revisit with the same symptoms', () => {
    const result = checkEligibility(profile, { sameSymptoms: true }, ruleSet)

    expect(result.status).toBe('eligible')
    expect(result.checks).toEqual([
      expect.objectContaining({ id: 'identity', passed: true }),
      expect.objectContaining({ id: 'revisit', passed: true }),
      expect.objectContaining({ id: 'same-symptoms', passed: true }),
      expect.objectContaining({ id: 'clinic', passed: true }),
    ])
    expect(result.ruleSetAsOf).toBe('2026-07-22')
  })

  it('routes a revisit patient to in-person care for different new symptoms', () => {
    const result = checkEligibility(profile, { sameSymptoms: false }, ruleSet)

    expect(result.status).toBe('ineligible')
    expect(result.summary).toBe('과거 진료와 다른 새 증상은 대면 진료가 필요합니다.')
    expect(result.checks.find(({ id }) => id === 'same-symptoms')).toEqual(
      expect.objectContaining({ passed: false }),
    )
  })
})

