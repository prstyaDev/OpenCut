import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { TooltipProvider } from '#/components/ui/tooltip.tsx'

/**
 * Custom render function that wraps components with necessary providers.
 *
 * This ensures all components have access to:
 * - TooltipProvider (required for tooltip components)
 * - Future: Router context, theme provider, etc.
 *
 * @example
 * ```tsx
 * import { render, screen } from '#/test/utils.tsx'
 *
 * test('renders button', () => {
 *   render(<Button>Click me</Button>)
 *   expect(screen.getByRole('button')).toHaveTextContent('Click me')
 * })
 * ```
 */
export function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <TooltipProvider>{children}</TooltipProvider>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render with our custom version
export { customRender as render }
