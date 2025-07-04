import Link from 'next/link'
import { Button } from '@heroui/react'

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/sports', label: 'Sports' },
  { href: '/admin', label: 'Admin' },
]

export function Navigation() {
  return (
    <nav className="flex gap-4">
      {navigationItems.map((item) => (
        <Button
          key={item.href}
          as={Link}
          href={item.href}
          variant="light"
          className="text-foreground"
        >
          {item.label}
        </Button>
      ))}
    </nav>
  )
}
