'use client'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Chip,
  Progress
} from '@nextui-org/react'
import { useState } from 'react'
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </Button>
  )
}



export default function TestUI() {
  const [inputValue, setInputValue] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hero UI Component Test</h1>
        <ThemeToggle />
      </div>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <h2 className="text-xl">Buttons</h2>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 flex-wrap">
            <Button color="primary" data-color="primary">Primary</Button>
            <Button color="secondary" data-color="secondary">Secondary</Button>
            <Button color="success" data-color="success">Success</Button>
            <Button color="warning" data-color="warning">Warning</Button>
            <Button color="danger" data-color="danger">Danger</Button>
            <Button variant="ghost" data-variant="ghost">Ghost</Button>
          </div>
        </CardBody>
      </Card>

      {/* Form Components */}
      <Card>
        <CardHeader>
            <h2 className="text-xl">Form Components</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4 max-w-xs">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-foreground">Test Input</label>
                <Input
                  placeholder="Type something..."
                  value={inputValue}
                  onValueChange={setInputValue}
                  aria-label="Test Input"
                />
              </div>
              <Progress 
                value={60} 
                color="primary" 
                aria-label="Progress indicator (60%)"
              />
            </div>
          </CardBody>
      </Card>

      {/* Modal Test */}
      <Card>
        <CardHeader>
          <h2 className="text-xl">Modal</h2>
        </CardHeader>
        <CardBody>
          <Button onPress={onOpen}>Open Modal</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Test Modal</ModalHeader>
                  <ModalBody>
                    <p>This modal tests Hero UI functionality.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>

      {/* Chips */}
      <Card>
        <CardHeader>
          <h2 className="text-xl">Chips</h2>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2 flex-wrap">
            <Chip color="primary">Football</Chip>
            <Chip color="secondary">Basketball</Chip>
            <Chip color="success">Baseball</Chip>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
