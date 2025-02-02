module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  testRegex: '.*\\.spec\\.(t|j)s$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  coverageDirectory: 'coverage'
}; 