import type { MedicationDecision, MedicationRuleSet } from './types'

export function checkMedication(medicationId: string, ruleSet: MedicationRuleSet): MedicationDecision {
  const rule = ruleSet.medications[medicationId]

  if (!rule) {
    return {
      medicationId,
      name: '확인되지 않은 약품',
      status: 'prohibited',
      reason: '시연 규칙에 없는 약품은 선택할 수 없습니다.',
      source: ruleSet.source,
      asOf: ruleSet.asOf,
      evidenceUrl: ruleSet.evidenceUrl,
    }
  }

  return { ...rule, source: ruleSet.source, asOf: ruleSet.asOf, evidenceUrl: ruleSet.evidenceUrl }
}
