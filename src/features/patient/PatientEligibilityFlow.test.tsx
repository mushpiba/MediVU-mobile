import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../../App'

describe('patient eligibility flow', () => {
  beforeEach(() => {
    window.location.hash = '#/patient/home'
  })

  it('moves from the returning-patient home to an eligible scheduling result', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '비대면 재진 시작하기' }))
    expect(screen.getByRole('heading', { name: '다니던 병원을 선택해 주세요' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '해솔가정의학과의원 선택' }))
    await user.click(screen.getByRole('button', { name: '네, 같은 증상이에요' }))

    expect(screen.getByRole('heading', { name: '비대면 재진 예약 대상입니다' })).toBeInTheDocument()
    expect(screen.getByText('FUTURE POLICY DEMO · 2026-07-22')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '예약 시간 선택하기' })).toBeEnabled()
  })

  it('blocks telemedicine scheduling when the patient reports a new symptom', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '비대면 재진 시작하기' }))
    await user.click(screen.getByRole('button', { name: '해솔가정의학과의원 선택' }))
    await user.click(screen.getByRole('button', { name: '아니요, 다른 새 증상이에요' }))

    expect(screen.getByRole('heading', { name: '대면 진료가 필요합니다' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '예약 시간 선택하기' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '대면 진료 예약 보기' })).toBeInTheDocument()
  })
})
