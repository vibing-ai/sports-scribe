import { Card, CardBody, CardHeader } from '@heroui/react'

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Article {params.id}</h1>
        </CardHeader>
        <CardBody>
          <p>This is a placeholder for article content with ID: {params.id}</p>
          <p className="mt-4 text-gray-600">
            This page will display the full content of an AI-generated sports article.
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
