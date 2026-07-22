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

  it('resets the shared demo and returns to the patient home', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/doctor/schedule'
    render(<App />)

    await user.click(screen.getByRole('button', { name: '전체 초기화' }))

    expect(window.location.hash).toBe('#/patient/home')
    expect(screen.getByRole('status')).toHaveTextContent('데모가 초기화되었습니다.')
  })
})
