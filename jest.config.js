module.exports = {
  clearMocks: true,
  coverageDirectory: '.coverage',
  testEnvironment: 'jsdom',
  setupFiles: ['./test/setup.js'],
  testMatch: ['**/test/**/*.js'],
  testPathIgnorePatterns: ['setup.js'],
};
