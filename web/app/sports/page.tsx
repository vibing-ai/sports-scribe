import { Card, CardBody, CardHeader, Button } from '@nextui-org/react'
import Link from 'next/link'

const sports = ['football', 'basketball', 'baseball', 'soccer', 'tennis', 'hockey']

export default function SportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sports Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sports.map((sport) => (
          <Card key={sport}>
            <CardHeader>
              <h3 className="text-lg font-semibold capitalize">{sport}</h3>
            </CardHeader>
            <CardBody>
              <p className="mb-4">Browse {sport} articles and news</p>
              <Button as={Link} href={`/sports/${sport}`} color="primary" size="sm">
                View {sport} Articles
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
} 