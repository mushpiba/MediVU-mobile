import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../../App'

describe('doctor prescription safeguards', () => {
  beforeEach(() => {
    window.location.hash = '#/doctor/orders?diagnosis=allergic-rhinitis'
  })

  it('prefills the selected diagnosis and the allowed demonstration order', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '처방·오더' })).toBeInTheDocument()
    expect(screen.getByText('알레르기 비염, 상세불명 (J30.4)')).toBeInTheDocument()
    expect(screen.getByText('세티리진염산염 10mg')).toBeInTheDocument()
    expect(screen.getByText('비대면 처방 가능')).toBeInTheDocument()
    expect(screen.getByText('HIRA demo snapshot · 2026-07-22')).toBeInTheDocument()
  })

  it('blocks zolpidem selection and stores the allowed prescription', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('searchbox', { name: '약품 검색' }), '졸피뎀')
    expect(screen.getByText('향정신성의약품 · 비대면 처방 금지')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '졸피뎀타르타르산염 선택 불가' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: '처방·오더 확정' }))
    expect(screen.getByRole('status')).toHaveTextContent('처방과 오더를 저장했습니다.')
  })
})
