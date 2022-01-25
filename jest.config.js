module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
    coverageDirectory: './coverage/',
    moduleNameMapper: {
        /* Handle CSS imports (with CSS modules)
      https://jestjs.io/docs/webpack#mocking-css-modules */
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

        // Handle CSS imports (without CSS modules)
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

        /* Handle image imports
      https://jestjs.io/docs/webpack#handling-static-assets */
        '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/public/'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testResultsProcessor: 'jest-sonar-reporter',
    testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
};
