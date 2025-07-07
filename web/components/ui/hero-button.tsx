import { Button, ButtonProps } from '@nextui-org/react'

export interface HeroButtonProps extends ButtonProps {
  // Add any custom props here
}

export function HeroButton({ children, ...props }: HeroButtonProps) {
  return (
    <Button {...props}>
      {children}
    </Button>
  )
} 