import { fireEvent } from '@testing-library/react'

/**
 * Keyboard event simulation utilities for testing keyboard interactions.
 */
export const keyboard = {
  /**
   * Simulates pressing the Enter key on an element.
   * @example
   * keyboard.enter(button)
   */
  enter: (element: Element) => {
    fireEvent.keyDown(element, { key: 'Enter', code: 'Enter', keyCode: 13 })
    fireEvent.keyUp(element, { key: 'Enter', code: 'Enter', keyCode: 13 })
  },

  /**
   * Simulates pressing the Space key on an element.
   * @example
   * keyboard.space(checkbox)
   */
  space: (element: Element) => {
    fireEvent.keyDown(element, { key: ' ', code: 'Space', keyCode: 32 })
    fireEvent.keyUp(element, { key: ' ', code: 'Space', keyCode: 32 })
  },

  /**
   * Simulates pressing the Escape key.
   * @example
   * keyboard.escape(dialog)
   */
  escape: (element: Element) => {
    fireEvent.keyDown(element, { key: 'Escape', code: 'Escape', keyCode: 27 })
    fireEvent.keyUp(element, { key: 'Escape', code: 'Escape', keyCode: 27 })
  },

  /**
   * Simulates pressing the Tab key for focus navigation.
   * @example
   * keyboard.tab()
   */
  tab: (element: Element = document.body) => {
    fireEvent.keyDown(element, { key: 'Tab', code: 'Tab', keyCode: 9 })
  },

  /**
   * Simulates pressing Shift+Tab for reverse focus navigation.
   * @example
   * keyboard.shiftTab()
   */
  shiftTab: (element: Element = document.body) => {
    fireEvent.keyDown(element, {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    })
  },

  /**
   * Simulates arrow key navigation.
   * @example
   * keyboard.arrowDown(listbox)
   */
  arrowUp: (element: Element) => {
    fireEvent.keyDown(element, {
      key: 'ArrowUp',
      code: 'ArrowUp',
      keyCode: 38,
    })
  },

  arrowDown: (element: Element) => {
    fireEvent.keyDown(element, {
      key: 'ArrowDown',
      code: 'ArrowDown',
      keyCode: 40,
    })
  },

  arrowLeft: (element: Element) => {
    fireEvent.keyDown(element, {
      key: 'ArrowLeft',
      code: 'ArrowLeft',
      keyCode: 37,
    })
  },

  arrowRight: (element: Element) => {
    fireEvent.keyDown(element, {
      key: 'ArrowRight',
      code: 'ArrowRight',
      keyCode: 39,
    })
  },
}

/**
 * Accessibility testing utilities for verifying ARIA attributes and roles.
 */
export const a11y = {
  /**
   * Checks if an element has the correct ARIA role.
   * @example
   * expect(a11y.hasRole(button, 'button')).toBe(true)
   */
  hasRole: (element: Element, role: string): boolean => {
    return element.getAttribute('role') === role
  },

  /**
   * Checks if an element has aria-label or aria-labelledby.
   * @example
   * expect(a11y.hasAccessibleName(input)).toBe(true)
   */
  hasAccessibleName: (element: Element): boolean => {
    return (
      element.hasAttribute('aria-label') ||
      element.hasAttribute('aria-labelledby') ||
      (element instanceof HTMLLabelElement &&
        element.htmlFor !== '') ||
      (element instanceof HTMLInputElement &&
        !!element.labels?.length)
    )
  },

  /**
   * Checks if an element is keyboard accessible (has tabIndex >= 0 or is naturally focusable).
   * @example
   * expect(a11y.isKeyboardAccessible(button)).toBe(true)
   */
  isKeyboardAccessible: (element: Element): boolean => {
    const tabIndex = element.getAttribute('tabindex')
    const naturallyFocusable = [
      'A',
      'BUTTON',
      'INPUT',
      'SELECT',
      'TEXTAREA',
    ].includes(element.tagName)

    return (
      naturallyFocusable ||
      (tabIndex !== null && parseInt(tabIndex, 10) >= 0)
    )
  },

  /**
   * Checks if an element is marked as disabled via aria-disabled or disabled attribute.
   * @example
   * expect(a11y.isDisabled(button)).toBe(true)
   */
  isDisabled: (element: Element): boolean => {
    return (
      element.getAttribute('aria-disabled') === 'true' ||
      element.hasAttribute('disabled')
    )
  },

  /**
   * Checks if an element is marked as invalid via aria-invalid.
   * @example
   * expect(a11y.isInvalid(input)).toBe(true)
   */
  isInvalid: (element: Element): boolean => {
    return element.getAttribute('aria-invalid') === 'true'
  },
}

/**
 * Helper to wait for async operations in tests.
 * @example
 * await waitFor(() => expect(element).toBeInTheDocument())
 */
export { waitFor } from '@testing-library/react'
