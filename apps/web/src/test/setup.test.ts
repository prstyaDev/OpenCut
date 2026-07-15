import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Test Setup', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true)
  })

  it('should render React components', () => {
    const TestComponent = () => <div>Hello Test</div>
    render(<TestComponent />)
    expect(screen.getByText('Hello Test')).toBeInTheDocument()
  })

  it('should support path aliases', async () => {
    // Test that #/* path alias works
    const { cn } = await import('#/lib/utils.ts')
    expect(cn).toBeDefined()
    expect(typeof cn).toBe('function')
  })

  it('should have jsdom environment', () => {
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
    expect(document.body).toBeInstanceOf(HTMLElement)
  })
})
