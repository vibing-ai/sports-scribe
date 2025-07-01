import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from '@heroui/react'
import Link from 'next/link'

export interface ArticleCardProps {
  id: string
  title: string
  excerpt: string
  sport: string
  createdAt: string
  author?: string
}

export function ArticleCard({ 
  id, 
  title, 
  excerpt, 
  sport, 
  createdAt, 
  author = 'AI Sports Writer' 
}: ArticleCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex justify-between items-start w-full">
          <Chip color="primary" variant="flat" size="sm">
            {sport}
          </Chip>
          <small className="text-default-500">
            {new Date(createdAt).toLocaleDateString()}
          </small>
        </div>
        <h3 className="font-bold text-large mt-2">{title}</h3>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <p className="text-default-600 text-small">{excerpt}</p>
        <small className="text-default-500 mt-2">By {author}</small>
      </CardBody>
      <CardFooter className="pt-0">
        <Button 
          as={Link} 
          href={`/articles/${id}`} 
          color="primary" 
          variant="flat" 
          size="sm"
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  )
} 