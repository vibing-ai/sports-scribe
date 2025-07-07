'use client';

import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { useState } from 'react';

export default function HeroTestPage() {
  const [inputValue, setInputValue] = useState('');
  
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Hero UI Components Test</h1>
      
      {/* Button Component Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button color="primary">Primary Button</Button>
          <Button color="secondary">Secondary Button</Button>
          <Button color="success">Success Button</Button>
          <Button color="warning">Warning Button</Button>
          <Button color="danger">Danger Button</Button>
          <Button isDisabled>Disabled Button</Button>
        </div>
      </section>

      {/* Card Component Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="max-w-[400px]">
            <CardHeader>
              <h3 className="text-lg font-semibold">Default Card</h3>
            </CardHeader>
            <CardBody>
              <p>This is a basic card component with some sample content to demonstrate its appearance and functionality.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm" color="primary">Learn More</Button>
            </CardFooter>
          </Card>

          <Card isHoverable className="max-w-[400px] bg-primary-50 dark:bg-primary-900">
            <CardHeader>
              <h3 className="text-lg font-semibold">Hoverable Card</h3>
            </CardHeader>
            <CardBody>
              <p>This card has hover effects. Try hovering over it to see the effect.</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Input Component Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Input Fields</h2>
        <div className="space-y-4 max-w-md">
          <Input 
            label="Name" 
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="Enter your email"
            description="We'll never share your email with anyone else."
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="Enter your password"
            isRequired
          />
          <div>
            <p className="text-sm text-gray-500 mb-2">Input value: {inputValue || 'Type something...'}</p>
          </div>
        </div>
      </section>

      {/* Responsive Test */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Responsive Test</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-center">Resize your browser window to see how the components respond to different screen sizes.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-4">
                <h4 className="font-medium mb-2">Card {item}</h4>
                <p className="text-sm">This card will stack on mobile and arrange in columns on larger screens.</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
