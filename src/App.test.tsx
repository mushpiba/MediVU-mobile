import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

describe('MediVU Mobile app shell', () => {
  beforeEach(() => {
    window.location.hash = '#/patient/home'
  })

  it('switches between patient and doctor roles from one demo toolbar', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: '환자 홈' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '의사 보기' }))

    expect(screen.getByRole('heading', { name: '오늘의 비대면 일정' })).toBeInTheDocument()
    expect(window.location.hash).toBe('#/doctor/schedule')
  })

  it('opens patient and doctor visit screens together from the first toolbar button', async () => {
    const user = userEvent.setup()
    render(<App />)

    const roleButtons = screen.getByRole('navigation', { name: '데모 역할 전환' }).querySelectorAll('button')
    expect(roleButtons[0]).toHaveTextContent('동시 보기')

    await user.click(screen.getByRole('button', { name: '동시 보기' }))

    expect(window.location.hash).toBe('#/together/visit')
    expect(screen.getByRole('heading', { name: '비대면 진료' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '김하늘 환자 비대면 진료' })).toBeInTheDocument()

    await user.type(screen.getByRole('textbox', { name: '환자 메모 입력' }), '밤에 코막힘이 더 심해요')
    await user.click(screen.getByRole('button', { name: '의사에게 전달' }))

    expect(screen.getAllByText('환자 전달 · 밤에 코막힘이 더 심해요')).toHaveLength(2)
  })

  it('resets the shared demo and returns to the patient home', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/doctor/schedule'
    render(<App />)

    await user.click(screen.getByRole('button', { name: '전체 초기화' }))

    expect(window.location.hash).toBe('#/patient/home')
    expect(screen.getByRole('status')).toHaveTextContent('데모가 초기화되었습니다.')
  })
})
