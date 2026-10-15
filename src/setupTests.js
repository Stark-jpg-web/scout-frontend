import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import './i18n.js'

afterEach(() => {
  cleanup()
})

if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback
    }
    observe() {
      this.callback([{ isIntersecting: true }])
    }
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = MockIntersectionObserver
}
