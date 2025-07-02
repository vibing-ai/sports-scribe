import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardProps,
} from "@heroui/react";

export interface HeroCardProps extends CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function HeroCard({
  header,
  footer,
  children,
  ...props
}: HeroCardProps) {
  return (
    <Card {...props}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
