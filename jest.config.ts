import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
  testEnvironment: 'node', // Specify the environment (Node.js for backend)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Run setup file after Jest environment is set up
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and build directories
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize these file extensions
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for .ts and .tsx files
  },
  globals: {
    'ts-jest': {
      isolatedModules: true, // Improve performance by avoiding full type-checking
    },
  },
  verbose: true, // Display individual test results with the test suite hierarchy
};

export default config;

