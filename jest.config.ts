/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.jest.ts'],
  moduleNameMapper: {
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@components/(.*)$': '<rootDir>/src/components/$1',

    '^@pages$': '<rootDir>/src/pages/index.ts',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',

    '^@store$': '<rootDir>/src/store/index.ts',
    '^@store/(.*)$': '<rootDir>/src/store/$1',

    '^@types$': '<rootDir>/src/types/index.ts',
    '^@types/(.*)$': '<rootDir>/src/types/$1',

    '^@hooks': '<rootDir>/src/hooks/index.ts',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',

    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.tests.json',
      useESM: true,
    },
  },
};
