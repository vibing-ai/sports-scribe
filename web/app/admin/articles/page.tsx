import { Card, CardBody, CardHeader, Button } from '@heroui/react'

export default function AdminArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Article Management</h1>
      <div className="mb-6">
        <Button color="primary">Generate New Article</Button>
      </div>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent Articles</h3>
        </CardHeader>
        <CardBody>
          <p>This is a placeholder for the article management interface.</p>
          <p className="mt-2 text-gray-600">
            Features will include: article status, editing, publishing controls, and AI agent
            monitoring.
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
