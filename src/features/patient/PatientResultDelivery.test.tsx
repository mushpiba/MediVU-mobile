import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../../App'

describe('patient result and prescription delivery journey', () => {
  it('shows only the confirmed diagnosis and prescription after the doctor saves the order', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/doctor/orders?diagnosis=allergic-rhinitis'
    render(<App />)

    await user.click(screen.getByRole('button', { name: '처방·오더 확정' }))
    await user.click(screen.getByRole('button', { name: '환자 결과 화면 보기' }))

    expect(screen.getByRole('heading', { name: '진료 결과가 도착했습니다' })).toBeInTheDocument()
    expect(screen.getByText('알레르기 비염, 상세불명')).toBeInTheDocument()
    expect(screen.getByText('세티리진염산염 10mg')).toBeInTheDocument()
    expect(screen.queryByText('진단 후보 Top 5')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '전자처방전 보기' }))
    expect(screen.getByRole('heading', { name: '전자처방전' })).toBeInTheDocument()
  })

  it('moves through pharmacy, address, preparation, shipping, and delivery completion', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/patient/prescription'
    render(<App />)

    await user.click(screen.getByRole('button', { name: '약국 선택하기' }))
    expect(screen.getByRole('heading', { name: '약국 수령 방법을 선택해 주세요' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '배송 가능한 약국 찾기' }))

    expect(screen.getByRole('heading', { name: '약국을 선택해 주세요' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '해솔중앙약국 선택' }))
    expect(screen.getByRole('heading', { name: '배송 주소를 확인해 주세요' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '조제 요청하기' }))
    expect(screen.getByRole('heading', { name: '약을 준비하고 있어요' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '다음 배송 상태 보기' }))
    expect(screen.getByRole('heading', { name: '약이 배송 중입니다' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '배송 완료 상태 보기' }))
    expect(screen.getByRole('heading', { name: '배송이 완료되었습니다' })).toBeInTheDocument()
  })
})
