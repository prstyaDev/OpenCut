import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test case (unmount React trees)
afterEach(() => {
  cleanup()
})

// Extend Vitest matchers with custom matchers if needed in the future
// Example: expect.extend({ ... })
