vi.mock('virtual:pwa-register', () => ({
  registerSW: vi.fn(),
}))

import { registerSW } from 'virtual:pwa-register'
import { registerPwa } from './pwa'

describe('PWA registration', () => {
  it('registers the generated service worker immediately', () => {
    registerPwa()

    expect(registerSW).toHaveBeenCalledWith({ immediate: true })
  })
})
