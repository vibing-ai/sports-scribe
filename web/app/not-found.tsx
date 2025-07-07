import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Not Found</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">Could not find the requested resource</p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button color="primary" variant="solid">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}
