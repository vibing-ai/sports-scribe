const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Load environment variables from .env.test
require('dotenv').config({ path: '.env.test' });

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/config/(.*)$': '<rootDir>/config/$1',
    '^@/lib/ai-integration/article-processor$': '<rootDir>/__mocks__/article-processor.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(isows|@supabase|jose|@babel|@jest|@testing-library|@heroui)/)'
  ],
  // Handle TypeScript files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { 
      presets: [
        'next/babel',
        ['@babel/preset-typescript', { allowDeclareFields: true }]
      ],
      plugins: [
        ['@babel/plugin-transform-modules-commonjs', { loose: true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        '@babel/plugin-proposal-private-property-in-object'
      ]
    }],
  },
  // Handle ES modules
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  // Use a single worker to prevent file watching issues
  maxWorkers: 1,
  // Basic test configuration
  clearMocks: true,
  resetMocks: true,
  resetModules: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
