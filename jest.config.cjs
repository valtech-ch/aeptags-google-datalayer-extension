// https://jestjs.io/docs/configuration

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths,{ prefix: '<rootDir>/' }),
  preset: 'jest-puppeteer',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  testRegex: '.*spec\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  verbose: false
};
