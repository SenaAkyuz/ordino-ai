import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & BaseProps & {
  href?: never
}

interface LinkProps extends BaseProps {
  href: string
  external?: boolean
}

type Props = ButtonProps | LinkProps

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink shadow-soft hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-card active:translate-y-0 active:duration-75',
  secondary:
    'bg-transparent text-ink border border-line-strong hover:border-ink/30 hover:-translate-y-[2px] hover:bg-bg-soft active:translate-y-0 active:duration-75',
  ghost:
    'bg-transparent text-ink-70 hover:text-ink hover:bg-bg-soft',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-[14px] rounded-[8px] gap-1.5',
  md: 'px-5 py-3 text-[15px] rounded-[10px] gap-2',
  lg: 'px-6 py-3.5 text-[16px] rounded-[12px] gap-2',
}

const baseStyles =
  'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'

export function Button(props: Props) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  if ('href' in props && props.href) {
    const { external, href } = props as LinkProps
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
