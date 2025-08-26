/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.jest.ts'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.tests.json',
      useESM: true,
    },
  },
};
