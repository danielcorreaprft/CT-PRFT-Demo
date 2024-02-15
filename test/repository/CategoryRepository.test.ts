import categoryRepository from "../../repository/CategoryRepository";
import { createClient } from '../../utils/Client';

jest.mock('../../utils/Client', () => ({
    createClient: jest.fn(function (options) {
        const { ApiRoot } = require('@commercetools/platform-sdk');
        this.apiRoot = new ApiRoot();
        this.projectKey = options.projectKey;
    }),
}));

jest.mock('@commercetools/platform-sdk', () => ({
    ...jest.requireActual('@commercetools/platform-sdk'), // Optional: Retain other exports from the module
    ApiRoot: jest.fn(() => ({
        withProjectKey: jest.fn().mockReturnThis(),
        productProjections: jest.fn().mockReturnThis(),
        search: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ data: 'mockProducts' }),
    })),
    expectedProducts : { data: 'mockProducts' }
}));

describe('CategoryRepository', () => {
    const mockOptions = { projectKey: 'testKey' };

    beforeEach(() => {
        (createClient as jest.Mock).mockClear();
    });

    it('should create a client with the provided options', () => {
        const repository = new categoryRepository(mockOptions);
        expect(createClient).toHaveBeenCalledWith(mockOptions);
    });

    it('should return products for a given category ID', async () => {
        const ApiRoot = require('@commercetools/platform-sdk').ApiRoot;
        ApiRoot.mockImplementation(() => ({
            withProjectKey: jest.fn().mockReturnThis(),
            productProjections: jest.fn().mockReturnThis(),
            search: jest.fn().mockReturnThis(),
            get: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue(ApiRoot.expectedProducts),
        }));

        const categoryRepo = new categoryRepository(mockOptions);
        const products = await categoryRepo.getProductsForCategory('123');

        expect(products).toEqual(ApiRoot.expectedProducts);
    });

    it('should return an error if the API call fails', async () => {
        const expectedError = new Error('API error');
        const ApiRoot = require('@commercetools/platform-sdk').ApiRoot;
        ApiRoot.mockImplementation(() => ({
            withProjectKey: jest.fn().mockReturnThis(),
            productProjections: jest.fn().mockReturnThis(),
            search: jest.fn().mockReturnThis(),
            get: jest.fn().mockReturnThis(),
            execute: jest.fn().mockRejectedValue(expectedError),
        }));

        const categoryRepo = new categoryRepository(mockOptions);
        const error = await categoryRepo.getProductsForCategory('123');

        expect(error).toBe(expectedError);
    });
});
