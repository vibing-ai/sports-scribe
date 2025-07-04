import { Button, Card, CardBody, CardHeader } from '@heroui/react'

export default function TestHeroUI() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Hero UI Test Page</h1>

      {/* Test Button component */}
      <Button color="primary" className="mb-4">
        Test Button
      </Button>

      {/* Test Card component */}
      <Card className="max-w-[400px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Test Card</h2>
        </CardHeader>
        <CardBody>
          <p>If you can see this card with proper styling, Hero UI is working!</p>
        </CardBody>
      </Card>
    </div>
  )
} 