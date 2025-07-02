import { Input, InputProps } from "@heroui/react";

export interface HeroInputProps extends InputProps {
  // Add any custom props here
}

export function HeroInput({ ...props }: HeroInputProps) {
  return <Input {...props} />;
}
