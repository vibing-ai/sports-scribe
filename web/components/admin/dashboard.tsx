import { Card, CardHeader, CardBody, Progress, Chip } from '@nextui-org/react'

export interface DashboardStats {
  totalArticles: number
  totalViews: number
  articlesThisWeek: number
  aiAgentStatus: {
    dataCollector: string
    researcher: string
    writer: string
    editor: string
  }
}

export interface DashboardProps {
  stats: DashboardStats
}

export function Dashboard({ stats }: DashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'danger'
      case 'warning':
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Total Articles</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold text-primary">{stats.totalArticles}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Total Views</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold text-secondary">{stats.totalViews.toLocaleString()}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">This Week</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-bold text-success">{stats.articlesThisWeek}</p>
          <p className="text-small text-default-500">New articles</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">AI Agent Status</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {Object.entries(stats.aiAgentStatus).map(([agent, status]) => (
              <div key={agent} className="flex justify-between items-center">
                <span className="text-small capitalize">{agent}</span>
                <Chip 
                  color={getStatusColor(status)} 
                  variant="flat" 
                  size="sm"
                >
                  {status}
                </Chip>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 