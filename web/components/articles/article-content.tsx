import { Card, CardHeader, CardBody, Chip } from '@nextui-org/react'

export interface ArticleContentProps {
  title: string
  content: string
  sport: string
  createdAt: string
  author?: string
}

export function ArticleContent({ 
  title, 
  content, 
  sport, 
  createdAt, 
  author = 'AI Sports Writer' 
}: ArticleContentProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start gap-2 px-6 pt-6">
        <div className="flex gap-2 items-center">
          <Chip color="primary" variant="flat">
            {sport}
          </Chip>
          <span className="text-small text-default-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-small text-default-500">By {author}</p>
      </CardHeader>
      <CardBody className="px-6 py-4">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </CardBody>
    </Card>
  )
} 