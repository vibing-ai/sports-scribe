import { Card, CardHeader, CardBody } from '@heroui/react'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Activity,
  Calendar,
  Eye,
  MessageCircle,
  Plus,
  Settings,
  Download,
  CheckCircle,
  UserPlus,
} from 'lucide-react'

export interface DashboardStats {
  totalArticles: number
  totalViews: number
  articlesThisWeek: number
  publishedArticles: number
  totalUsers: number
  activeUsers: number
  viewsThisWeek: number
  totalComments: number
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

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: string
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

function StatCard({ title, value, icon, trend, color = 'primary' }: StatCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className={`text-${color}`}>{icon}</div>
      </CardHeader>
      <CardBody>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
      </CardBody>
    </Card>
  )
}

// Action Button Component
interface ActionButtonProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  description,
  onClick,
  variant = 'primary',
}) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg border transition-colors text-left ${
      variant === 'primary'
        ? 'border-blue-200 hover:bg-blue-50'
        : variant === 'secondary'
          ? 'border-gray-200 hover:bg-gray-50'
          : 'border-red-200 hover:bg-red-50'
    }`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </button>
)

// Action Group Component
interface ActionGroupProps {
  title: string
  children: React.ReactNode
}

const ActionGroup: React.FC<ActionGroupProps> = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <div className="grid grid-cols-1 gap-3">{children}</div>
  </div>
)

// Custom hook for quick actions
const useQuickActions = () => {
  const router = useRouter()

  const createNewArticle = () => router.push('/admin/articles/new')
  const scheduleGameCoverage = () => router.push('/admin/schedule')
  const reviewPendingArticles = () => router.push('/admin/articles?status=pending')
  const manageUserPermissions = () => router.push('/admin/users')
  const viewAnalytics = () => router.push('/admin/analytics')
  const manageSettings = () => router.push('/admin/settings')
  const exportData = () => {
    // Export logic will be implemented later
    console.log('Export data functionality to be implemented')
  }

  return {
    createNewArticle,
    scheduleGameCoverage,
    reviewPendingArticles,
    manageUserPermissions,
    viewAnalytics,
    manageSettings,
    exportData,
  }
}

// Refactored QuickActions Component
function QuickActions() {
  const actions = useQuickActions()

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Quick Actions</h3>
      </CardHeader>
      <CardBody className="space-y-6">
        <ActionGroup title="Content Management">
          <ActionButton
            icon={<Plus className="h-5 w-5 text-blue-600" />}
            title="Create New Article"
            description="Start writing a new sports article"
            onClick={actions.createNewArticle}
          />
          <ActionButton
            icon={<Calendar className="h-5 w-5 text-green-600" />}
            title="Schedule Game Coverage"
            description="Plan upcoming game coverage"
            onClick={actions.scheduleGameCoverage}
            variant="secondary"
          />
        </ActionGroup>

        <ActionGroup title="Review & Management">
          <ActionButton
            icon={<CheckCircle className="h-5 w-5 text-orange-600" />}
            title="Review Pending Articles"
            description="Check articles awaiting approval"
            onClick={actions.reviewPendingArticles}
            variant="secondary"
          />
          <ActionButton
            icon={<UserPlus className="h-5 w-5 text-purple-600" />}
            title="Manage User Permissions"
            description="Control user access and roles"
            onClick={actions.manageUserPermissions}
            variant="secondary"
          />
        </ActionGroup>

        <ActionGroup title="Analytics & System">
          <ActionButton
            icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
            title="View Analytics"
            description="Check performance metrics"
            onClick={actions.viewAnalytics}
            variant="secondary"
          />
          <ActionButton
            icon={<Settings className="h-5 w-5 text-gray-600" />}
            title="System Settings"
            description="Configure application settings"
            onClick={actions.manageSettings}
            variant="secondary"
          />
          <ActionButton
            icon={<Download className="h-5 w-5 text-gray-600" />}
            title="Export Data"
            description="Download articles and analytics"
            onClick={actions.exportData}
            variant="secondary"
          />
        </ActionGroup>
      </CardBody>
    </Card>
  )
}

export function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: <FileText className="h-4 w-4" />,
      trend: `${stats.articlesThisWeek} this week`,
      color: 'primary' as const,
    },
    {
      title: 'Published Articles',
      value: stats.publishedArticles,
      icon: <BarChart3 className="h-4 w-4" />,
      color: 'success' as const,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="h-4 w-4" />,
      color: 'secondary' as const,
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: <Activity className="h-4 w-4" />,
      color: 'warning' as const,
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: <Eye className="h-4 w-4" />,
      trend: `${stats.viewsThisWeek} this week`,
      color: 'primary' as const,
    },
    {
      title: 'Total Comments',
      value: stats.totalComments,
      icon: <MessageCircle className="h-4 w-4" />,
      color: 'secondary' as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  )
}

function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>5 articles published today</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Traffic up 12% this week</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>3 new users registered</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
