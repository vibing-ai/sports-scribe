import { Card, CardHeader, CardBody, Progress } from '@heroui/react'

export interface AnalyticsData {
  topSports: Array<{ sport: string; percentage: number }>
  weeklyGrowth: number
  engagement: {
    averageTimeOnPage: string
    bounceRate: number
    returnVisitors: number
  }
}

export interface AnalyticsPanelProps {
  data: AnalyticsData
}

export function AnalyticsPanel({ data }: AnalyticsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Sports</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {data.topSports.map((item, index) => (
              <div key={item.sport}>
                <div className="flex justify-between text-small mb-1">
                  <span className="capitalize">{item.sport}</span>
                  <span>{item.percentage}%</span>
                </div>
                <Progress 
                  value={item.percentage} 
                  color={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'default'}
                  size="sm"
                  aria-label={`${item.sport} progress: ${item.percentage}%`}
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Growth Metrics</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <p className="text-small text-default-500">Weekly Growth</p>
              <p className="text-2xl font-bold text-success">+{data.weeklyGrowth}%</p>
            </div>
            <div>
              <p className="text-small text-default-500">Avg. Time on Page</p>
              <p className="text-lg font-semibold">{data.engagement.averageTimeOnPage}</p>
            </div>
            <div>
              <p className="text-small text-default-500">Return Visitors</p>
              <p className="text-lg font-semibold">{data.engagement.returnVisitors}%</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Engagement</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <p className="text-small text-default-500 mb-2">Bounce Rate</p>
              <Progress 
                value={data.engagement.bounceRate} 
                color={data.engagement.bounceRate < 40 ? 'success' : data.engagement.bounceRate < 60 ? 'warning' : 'danger'}
                label={`${data.engagement.bounceRate}%`}
                showValueLabel={true}
                aria-label={`Bounce rate: ${data.engagement.bounceRate}%`}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 