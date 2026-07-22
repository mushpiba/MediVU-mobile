import type { MedicationRuleSet } from '../domain/types'

export const medicationRuleSet: MedicationRuleSet = {
  source: 'HIRA demo snapshot',
  asOf: '2026-07-22',
  evidenceUrl: 'https://www.hira.or.kr/bbsDummy.do?brdBltNo=11998&brdScnBltNo=4&pageIndex=1&pgmid=HIRAA020002000100',
  medications: {
    cetirizine: {
      medicationId: 'cetirizine',
      name: '세티리진염산염',
      status: 'allowed',
      reason: '시연용 제한 목록에서 비대면 처방 금지 성분으로 분류되지 않았습니다.',
    },
    prednisolone: {
      medicationId: 'prednisolone',
      name: '프레드니솔론',
      status: 'conditional',
      reason: '환자 상태와 과거 투약력을 의사가 추가 확인한 뒤 선택하는 시연 항목입니다.',
    },
    zolpidem: {
      medicationId: 'zolpidem',
      name: '졸피뎀타르타르산염',
      status: 'prohibited',
      reason: '향정신성의약품으로 설정된 시연 fixture이므로 비대면 처방 선택을 차단합니다.',
    },
  },
}
