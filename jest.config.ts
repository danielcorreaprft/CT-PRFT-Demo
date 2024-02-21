import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'client/*.{ts,tsx}',
        'controller/*.{ts,tsx}',
        'repository/*.{ts,tsx}',
        'routes/*.{ts,tsx}',
        'utils/*.{ts,tsx}',
    ],
};

export default config;