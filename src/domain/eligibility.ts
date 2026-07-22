import type {
  EligibilityAnswers,
  EligibilityCheck,
  EligibilityProfile,
  EligibilityResult,
  EligibilityRuleSet,
} from './types'

export function checkEligibility(
  profile: EligibilityProfile,
  answers: EligibilityAnswers,
  ruleSet: EligibilityRuleSet,
): EligibilityResult {
  const checks: EligibilityCheck[] = [
    { id: 'identity', label: '본인 확인', passed: profile.identityVerified },
    { id: 'revisit', label: '검증된 재진 기록', passed: profile.hasVerifiedRevisit },
    { id: 'same-symptoms', label: '이전과 동일한 증상', passed: answers.sameSymptoms },
    { id: 'clinic', label: '병원 비대면 진료 운영', passed: profile.clinicTelemedicineEnabled },
  ]
  const status = checks.every(({ passed }) => passed) ? 'eligible' : 'ineligible'

  return {
    status,
    summary:
      status === 'eligible'
        ? '확인된 재진 기록과 동일 증상을 바탕으로 예약할 수 있습니다.'
        : answers.sameSymptoms
          ? '현재 확인 항목으로는 비대면 예약이 어렵습니다.'
          : '과거 진료와 다른 새 증상은 대면 진료가 필요합니다.',
    checks,
    ruleSetName: ruleSet.name,
    ruleSetAsOf: ruleSet.asOf,
  }
}
