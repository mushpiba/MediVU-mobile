import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../../App'

describe('patient consultation journey', () => {
  beforeEach(() => {
    window.location.hash = '#/patient/schedule'
  })

  it('books 14:30, enters the waiting room, and plays the simulated consultation', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: '진료 시간을 선택해 주세요' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '오후 2:30 선택' }))
    await user.click(screen.getByRole('button', { name: '예약 확정하기' }))

    expect(screen.getByRole('heading', { name: '예약이 완료되었습니다' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '대기실로 이동' }))
    expect(screen.getByRole('heading', { name: '의사 선생님이 곧 연결됩니다' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '진료실 입장하기' }))
    await user.click(screen.getByRole('button', { name: '진료 재생' }))

    expect(screen.getByText('요즘 재채기와 맑은 콧물이 계속 나요.')).toBeInTheDocument()
    expect(screen.getByText('재채기')).toBeInTheDocument()
    expect(screen.getByText('맑은 콧물')).toBeInTheDocument()
  })

  it('supports button and drag expansion and stores a visibly patient-sourced note', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/patient/visit'
    render(<App />)

    const sheet = screen.getByTestId('consultation-sheet')
    const expandButton = screen.getByRole('button', { name: '진료 내용 펼치기' })
    expect(expandButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(expandButton)
    expect(screen.getByRole('button', { name: '진료 내용 접기' })).toHaveAttribute('aria-expanded', 'true')

    await user.type(screen.getByRole('textbox', { name: '환자 메모 입력' }), '밤에 코막힘이 심해요')
    await user.click(screen.getByRole('button', { name: '의사에게 전달' }))
    expect(screen.getByText('환자 전달 · 밤에 코막힘이 심해요')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '진료 내용 접기' }))
    fireEvent.pointerDown(sheet, { clientY: 700 })
    fireEvent.pointerUp(sheet, { clientY: 520 })
    expect(screen.getByRole('button', { name: '진료 내용 접기' })).toHaveAttribute('aria-expanded', 'true')
  })
})
