import { useNavigate } from 'react-router-dom'
import type { DeliveryStage } from '../../domain/types'
import { useDemoEncounter } from '../../state/DemoEncounterContext'

const stageIndex: Record<DeliveryStage, number> = { eligibility: 0, pharmacy: 1, address: 2, preparing: 3, shipping: 4, delivered: 5 }

export function PatientDelivery() {
  const navigate = useNavigate()
  const { state, setDeliveryStage } = useDemoEncounter()
  const stage = state.deliveryStage

  return (
    <main className="patient-shell delivery-screen">
      <header className="flow-header"><button className="icon-button" type="button" aria-label="전자처방전으로 돌아가기" onClick={() => navigate('/patient/prescription')}>‹</button><div><span className="eyebrow">PHARMACY JOURNEY · DEMO</span><strong>약국·배송</strong></div><span className="step-count">{stageIndex[stage] + 1} / 6</span></header>
      <div className="delivery-progress" aria-label="배송 진행 상태">{Object.keys(stageIndex).map((item) => <span className={stageIndex[item as DeliveryStage] <= stageIndex[stage] ? 'active' : ''} key={item} />)}</div>
      {stage === 'eligibility' && <DeliveryChoice onNext={() => setDeliveryStage('pharmacy')} />}
      {stage === 'pharmacy' && <PharmacyChoice onNext={() => setDeliveryStage('address')} />}
      {stage === 'address' && <AddressCheck onNext={() => setDeliveryStage('preparing')} />}
      {stage === 'preparing' && <TrackingStage kind="preparing" onNext={() => setDeliveryStage('shipping')} />}
      {stage === 'shipping' && <TrackingStage kind="shipping" onNext={() => setDeliveryStage('delivered')} />}
      {stage === 'delivered' && <TrackingStage kind="delivered" onNext={() => navigate('/patient/home')} />}
    </main>
  )
}

function DeliveryChoice({ onNext }: { onNext: () => void }) {
  return <section className="delivery-content"><span className="flow-symbol" aria-hidden="true">⌂</span><h1>약국 수령 방법을 선택해 주세요</h1><p className="flow-lead">처방전 전송과 결제는 포함하지 않는 시연 화면입니다.</p><div className="delivery-choice-list"><button type="button" onClick={onNext}><span aria-hidden="true">▱</span><div><strong>집으로 배송</strong><small>배송 가능한 가상 약국을 찾아요</small></div><i aria-hidden="true">›</i></button><button type="button"><span aria-hidden="true">✚</span><div><strong>약국에서 직접 수령</strong><small>가까운 가상 약국을 선택해요</small></div><i aria-hidden="true">›</i></button></div><button className="primary-button" type="button" onClick={onNext}>배송 가능한 약국 찾기</button></section>
}

function PharmacyChoice({ onNext }: { onNext: () => void }) {
  return <section className="delivery-content"><span className="flow-symbol" aria-hidden="true">✚</span><h1>약국을 선택해 주세요</h1><p className="flow-lead">현재 주소로 배송을 시연할 수 있는 약국입니다.</p><button className="pharmacy-card selected" type="button" aria-label="해솔중앙약국 선택" onClick={onNext}><span className="clinic-icon" aria-hidden="true">✚</span><div><strong>해솔중앙약국</strong><small>해솔도 바람길 · 1.2km</small><p><b>조제 예상 20분</b><b>가상 배송 가능</b></p></div><i aria-hidden="true">✓</i></button><button className="pharmacy-card" type="button"><span className="clinic-icon" aria-hidden="true">✚</span><div><strong>푸른섬약국</strong><small>해솔도 물결길 · 3.8km</small><p><b>조제 예상 35분</b></p></div><i aria-hidden="true">›</i></button></section>
}

function AddressCheck({ onNext }: { onNext: () => void }) {
  return <section className="delivery-content"><span className="flow-symbol" aria-hidden="true">⌖</span><h1>배송 주소를 확인해 주세요</h1><p className="flow-lead">모든 주소는 시연을 위한 가상 정보입니다.</p><div className="address-card"><span aria-hidden="true">⌂</span><div><small>기본 배송지</small><strong>해솔도 바람길 42</strong><p>파도마을 101동 704호 · 김하늘</p></div><button type="button">수정</button></div><label className="delivery-agreement"><input type="checkbox" defaultChecked /><span>문 앞 비대면 수령을 요청합니다.<small>실제 결제·배송 요청은 발생하지 않습니다.</small></span></label><button className="primary-button" type="button" onClick={onNext}>조제 요청하기</button></section>
}

function TrackingStage({ kind, onNext }: { kind: 'preparing' | 'shipping' | 'delivered'; onNext: () => void }) {
  const content = {
    preparing: { icon: 'Rx', eyebrow: 'PREPARING', title: '약을 준비하고 있어요', copy: '해솔중앙약국에서 처방 내용을 확인하고 있습니다.', button: '다음 배송 상태 보기' },
    shipping: { icon: '▰', eyebrow: 'ON THE WAY', title: '약이 배송 중입니다', copy: '가상 배송원이 해솔도 바람길로 이동 중입니다.', button: '배송 완료 상태 보기' },
    delivered: { icon: '✓', eyebrow: 'DELIVERED', title: '배송이 완료되었습니다', copy: '문 앞 수령이 완료된 것으로 시연되었습니다.', button: '홈으로 돌아가기' },
  }[kind]
  return <section className={`delivery-content tracking-content ${kind}`}><span className="tracking-icon" aria-hidden="true">{content.icon}</span><span className="eyebrow">{content.eyebrow}</span><h1>{content.title}</h1><p className="flow-lead">{content.copy}</p><div className="tracking-card"><div><span className="active">✓</span><p><strong>처방전 확인</strong><small>14:46</small></p></div><div><span className={kind !== 'preparing' ? 'active' : ''}>{kind === 'preparing' ? '2' : '✓'}</span><p><strong>조제 완료</strong><small>{kind === 'preparing' ? '진행 중' : '15:06'}</small></p></div><div><span className={kind === 'delivered' ? 'active' : ''}>{kind === 'delivered' ? '✓' : '3'}</span><p><strong>배송 완료</strong><small>{kind === 'delivered' ? '15:42' : '예정'}</small></p></div></div><div className="pharmacy-contact"><span className="clinic-icon" aria-hidden="true">✚</span><div><strong>해솔중앙약국</strong><small>가상 문의 · 000-0000-0000</small></div></div><button className="primary-button" type="button" onClick={onNext}>{content.button}</button></section>
}
