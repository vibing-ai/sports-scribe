import { Card, CardBody, CardHeader } from '@heroui/react'

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Sports Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for article cards */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Sample Article</h3>
          </CardHeader>
          <CardBody>
            <p>This is a placeholder for an AI-generated sports article.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
