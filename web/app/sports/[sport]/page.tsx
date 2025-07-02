import { Card, CardBody, CardHeader } from "@heroui/react";

interface SportPageProps {
  params: {
    sport: string;
  };
}

export default function SportPage({ params }: SportPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {params.sport} Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for sport-specific articles */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              Sample {params.sport} Article
            </h3>
          </CardHeader>
          <CardBody>
            <p>This is a placeholder for {params.sport} articles.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
