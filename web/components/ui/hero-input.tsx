import { Input, InputProps } from '@nextui-org/react'

export interface HeroInputProps extends InputProps {
  // Add any custom props here
}

export function HeroInput({ ...props }: HeroInputProps) {
  return <Input {...props} />
} 