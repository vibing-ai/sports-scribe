import { Card, CardBody, CardHeader } from '@heroui/react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Sports Scribe</h1>
        <p className="text-xl text-gray-600">Revolutionizing sports journalism with AI-powered insights</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Our Mission</h2>
        </CardHeader>
        <CardBody>
          <div className="prose max-w-none">
            <p>
              At Sports Scribe, we&apos;re transforming how sports content is created and consumed. 
              Our AI-powered platform delivers in-depth analysis, game recaps, and player insights 
              with the speed and accuracy that modern sports fans demand.
            </p>
          </div>
        </CardBody>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-semibold">How It Works</h2>
        </CardHeader>
        <CardBody>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>AI analyzes game data and statistics in real-time</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>Automated generation of game recaps and analysis</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>Human editors review and enhance the content</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>Published to our platform for fans to enjoy</span>
            </li>
          </ul>
        </CardBody>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
        </CardHeader>
        <CardBody>
          <div className="prose max-w-none">
            <p>
              Have questions or feedback? We&apos;d love to hear from you! Reach out to our team at{' '}
              <a href="mailto:contact@sportsscribe.com" className="text-blue-600 hover:underline">
                contact@sportsscribe.com
              </a>
            </p>
            <p className="mt-4">
              Follow us on social media for the latest updates and content.
            </p>
          </div>
        </CardBody>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Sports Scribe. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
