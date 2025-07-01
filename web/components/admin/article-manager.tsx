import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@heroui/react'

export interface ManagedArticle {
  id: string
  title: string
  sport: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  views: number
}

export interface ArticleManagerProps {
  articles: ManagedArticle[]
  onEdit: (id: string) => void
  onPublish: (id: string) => void
  onArchive: (id: string) => void
}

export function ArticleManager({ articles, onEdit, onPublish, onArchive }: ArticleManagerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success'
      case 'draft':
        return 'warning'
      case 'archived':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Table aria-label="Article management table">
      <TableHeader>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>SPORT</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>VIEWS</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell>{article.title}</TableCell>
            <TableCell>
              <Chip color="primary" variant="flat" size="sm">
                {article.sport}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip color={getStatusColor(article.status)} variant="flat" size="sm">
                {article.status}
              </Chip>
            </TableCell>
            <TableCell>{article.views.toLocaleString()}</TableCell>
            <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="light" onPress={() => onEdit(article.id)}>
                  Edit
                </Button>
                {article.status === 'draft' && (
                  <Button size="sm" color="primary" onPress={() => onPublish(article.id)}>
                    Publish
                  </Button>
                )}
                <Button size="sm" color="danger" variant="light" onPress={() => onArchive(article.id)}>
                  Archive
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 