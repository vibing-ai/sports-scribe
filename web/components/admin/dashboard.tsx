import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Activity,
  Calendar,
  Eye,
  MessageCircle,
} from "lucide-react";

export interface DashboardStats {
  totalArticles: number;
  totalViews: number;
  articlesThisWeek: number;
  publishedArticles: number;
  totalUsers: number;
  activeUsers: number;
  viewsThisWeek: number;
  totalComments: number;
  aiAgentStatus: {
    dataCollector: string;
    researcher: string;
    writer: string;
    editor: string;
  };
}

export interface DashboardProps {
  stats: DashboardStats;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
}

function StatCard({
  title,
  value,
  icon,
  trend,
  color = "primary",
}: StatCardProps) {
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
  );
}

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Quick Actions</h3>
      </CardHeader>
      <CardBody className="space-y-2">
        <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
          Create New Article
        </button>
        <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
          Schedule Game Coverage
        </button>
        <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
          Review Pending Articles
        </button>
        <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
          Manage User Permissions
        </button>
      </CardBody>
    </Card>
  );
}

export function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    {
      title: "Total Articles",
      value: stats.totalArticles,
      icon: <FileText className="h-4 w-4" />,
      trend: `${stats.articlesThisWeek} this week`,
      color: "primary" as const,
    },
    {
      title: "Published Articles",
      value: stats.publishedArticles,
      icon: <BarChart3 className="h-4 w-4" />,
      color: "success" as const,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="h-4 w-4" />,
      color: "secondary" as const,
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: <Activity className="h-4 w-4" />,
      color: "warning" as const,
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: <Eye className="h-4 w-4" />,
      trend: `${stats.viewsThisWeek} this week`,
      color: "primary" as const,
    },
    {
      title: "Total Comments",
      value: stats.totalComments,
      icon: <MessageCircle className="h-4 w-4" />,
      color: "secondary" as const,
    },
  ];

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
  );
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
  );
}
