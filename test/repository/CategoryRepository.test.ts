import server from "../../index";
import request from 'supertest';

const mockedProducts = {data: 'mockProducts'}
const mockedResponse = { statusCode:200,message:'test', body: mockedProducts }
jest.mock('../../repository/CategoryRepository', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getProductsForCategory: jest.fn().mockResolvedValue(mockedResponse),
        };
    });
});

afterAll(async () => {
    server.close();
});

describe('CategoryRepository', () => {

    it('should return products for a given category ID',  async() => {

        const response =  await request(server).get('/category/test');
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual(mockedProducts);
    });

});
