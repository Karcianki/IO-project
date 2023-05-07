module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.css$': 'jest-transform-stub',
    },
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.css$',
    ],
  };