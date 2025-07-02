import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Article Management</h3>
          </CardHeader>
          <CardBody>
            <p className="mb-4">Manage AI-generated articles</p>
            <Button as={Link} href="/admin/articles" color="primary" size="sm">
              Manage Articles
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Analytics</h3>
          </CardHeader>
          <CardBody>
            <p className="mb-4">View platform analytics</p>
            <Button as={Link} href="/admin/analytics" color="primary" size="sm">
              View Analytics
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
