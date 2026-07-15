import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility function', () => {
  describe('basic className merging', () => {
    it('should merge single string', () => {
      expect(cn('foo')).toBe('foo')
    })

    it('should merge multiple strings', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle empty strings', () => {
      expect(cn('', 'foo', '')).toBe('foo')
    })

    it('should handle no arguments', () => {
      expect(cn()).toBe('')
    })
  })

  describe('conditional classes with clsx', () => {
    it('should handle boolean conditionals', () => {
      expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar')
    })

    it('should filter out falsy values', () => {
      expect(cn('foo', null, undefined, false, 0, '')).toBe('foo')
    })

    it('should handle object notation', () => {
      expect(
        cn({
          foo: true,
          bar: false,
          baz: true,
        })
      ).toBe('foo baz')
    })

    it('should handle array inputs', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar')
    })

    it('should handle nested arrays', () => {
      expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
    })

    it('should handle mixed types', () => {
      expect(
        cn('foo', ['bar', { baz: true, qux: false }], undefined, 'quux')
      ).toBe('foo bar baz quux')
    })
  })

  describe('Tailwind class conflict resolution', () => {
    it('should resolve conflicting padding classes', () => {
      const result = cn('px-2', 'px-4')
      expect(result).toBe('px-4')
    })

    it('should resolve conflicting margin classes', () => {
      const result = cn('m-2', 'm-4')
      expect(result).toBe('m-4')
    })

    it('should resolve conflicting background classes', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toBe('bg-blue-500')
    })

    it('should resolve conflicting text color classes', () => {
      const result = cn('text-white', 'text-black')
      expect(result).toBe('text-black')
    })

    it('should keep non-conflicting classes', () => {
      const result = cn('px-4', 'py-2')
      expect(result).toContain('px-4')
      expect(result).toContain('py-2')
    })

    it('should resolve complex utility conflicts', () => {
      const result = cn(
        'rounded-md',
        'rounded-lg',
        'shadow-sm',
        'shadow-lg'
      )
      expect(result).toBe('rounded-lg shadow-lg')
    })

    it('should handle responsive variants correctly', () => {
      const result = cn('sm:px-2', 'sm:px-4', 'md:px-6')
      // Last sm:px wins, md:px is kept
      expect(result).toContain('sm:px-4')
      expect(result).toContain('md:px-6')
      expect(result).not.toContain('sm:px-2')
    })

    it('should handle state variants correctly', () => {
      const result = cn(
        'hover:bg-blue-500',
        'hover:bg-red-500',
        'focus:ring-2'
      )
      expect(result).toBe('hover:bg-red-500 focus:ring-2')
    })
  })

  describe('real-world usage patterns', () => {
    it('should work with component variant patterns', () => {
      const baseStyles = 'rounded-md border transition-colors'
      const variantStyles = 'bg-primary text-primary-foreground'
      const userStyles = 'mt-4'

      const result = cn(baseStyles, variantStyles, userStyles)

      expect(result).toContain('rounded-md')
      expect(result).toContain('border')
      expect(result).toContain('transition-colors')
      expect(result).toContain('bg-primary')
      expect(result).toContain('text-primary-foreground')
      expect(result).toContain('mt-4')
    })

    it('should handle conditional variants', () => {
      const isDisabled = true
      const isActive = false

      const result = cn(
        'base-class',
        isDisabled && 'opacity-50 cursor-not-allowed',
        isActive && 'ring-2 ring-primary'
      )

      expect(result).toBe('base-class opacity-50 cursor-not-allowed')
    })

    it('should allow user overrides via className prop pattern', () => {
      const baseStyles = 'bg-blue-500 px-4 py-2'
      const userOverride = 'bg-red-500 px-6'

      const result = cn(baseStyles, userOverride)

      // User overrides should win
      expect(result).toContain('bg-red-500')
      expect(result).toContain('px-6')
      expect(result).toContain('py-2')
      expect(result).not.toContain('bg-blue-500')
      expect(result).not.toContain('px-4')
    })

    it('should handle class-variance-authority patterns', () => {
      // Simulating CVA usage
      const variants = {
        size: {
          sm: 'h-6 text-xs',
          md: 'h-8 text-sm',
          lg: 'h-10 text-base',
        },
        variant: {
          primary: 'bg-primary text-white',
          secondary: 'bg-secondary text-black',
        },
      }

      const size = 'md'
      const variant = 'primary'

      const result = cn(
        'button-base',
        variants.size[size],
        variants.variant[variant],
        'custom-class'
      )

      expect(result).toContain('button-base')
      expect(result).toContain('h-8')
      expect(result).toContain('text-sm')
      expect(result).toContain('bg-primary')
      expect(result).toContain('text-white')
      expect(result).toContain('custom-class')
    })
  })

  describe('edge cases', () => {
    it('should handle undefined values', () => {
      expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    })

    it('should handle null values', () => {
      expect(cn('foo', null, 'bar')).toBe('foo bar')
    })

    it('should handle empty arrays', () => {
      expect(cn('foo', [], 'bar')).toBe('foo bar')
    })

    it('should handle empty objects', () => {
      expect(cn('foo', {}, 'bar')).toBe('foo bar')
    })

    it('should handle whitespace-only strings', () => {
      expect(cn('foo', '   ', 'bar')).toBe('foo bar')
    })

    it('should handle multiple whitespaces in strings', () => {
      expect(cn('foo  bar   baz')).toBe('foo bar baz')
    })

    it('should be chainable with identical inputs producing identical outputs', () => {
      const input = ['foo', { bar: true }, 'baz']
      const result1 = cn(...input)
      const result2 = cn(...input)
      expect(result1).toBe(result2)
    })
  })
})
