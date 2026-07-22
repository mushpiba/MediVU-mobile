import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../../App'

describe('doctor consultation workspace', () => {
  beforeEach(() => {
    window.location.hash = '#/doctor/schedule'
  })

  it('opens the 10-minute appointment, verifies revisit evidence, and starts the visit', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: '오늘의 비대면 일정' })).toBeInTheDocument()
    expect(screen.getByText('10분 후 진료')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '김하늘 환자 보기' }))

    expect(screen.getByRole('heading', { name: '재진 환자 확인' })).toBeInTheDocument()
    expect(screen.getByText('2026-04-18 대면 진료')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '대기 승인하고 진료 열기' }))

    expect(screen.getByRole('heading', { name: '김하늘 환자 비대면 진료' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '대화 시뮬레이션 재생' }))
    expect(screen.getByRole('heading', { name: '진단 후보 Top 5' })).toBeInTheDocument()
    expect(screen.getByText('알레르기 비염, 상세불명')).toBeInTheDocument()
  })

  it('shares patient-authored notes and opens the longitudinal history drawer', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/patient/visit'
    render(<App />)

    await user.click(screen.getByRole('button', { name: '진료 내용 펼치기' }))
    await user.type(screen.getByRole('textbox', { name: '환자 메모 입력' }), '눈도 많이 가려워요')
    await user.click(screen.getByRole('button', { name: '의사에게 전달' }))
    await user.click(screen.getByRole('button', { name: '의사 보기' }))
    await user.click(screen.getByRole('button', { name: '김하늘 환자 보기' }))
    await user.click(screen.getByRole('button', { name: '대기 승인하고 진료 열기' }))

    expect(screen.getByText('환자 전달 · 눈도 많이 가려워요')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '과거력 열기' }))
    expect(screen.getByRole('heading', { name: '과거 진료 기록' })).toBeInTheDocument()
    expect(screen.getByText('알레르기 비염 · J30.4')).toBeInTheDocument()
  })
})
