const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

const SoldPrice = require('../models/sold-price.schema');
const { formatQuery, generateResponse, getPercentile } = require('../util/sold-price');


describe('GraphQL pricesByRange resolver', () => {

    let find;

    beforeEach( () => {
        find = sinon.stub(SoldPrice, 'find');
        find.resolves(mockData);
    });

    it('should get data from the database', async () => {
        const results = await SoldPrice.find();
        expect(results).to.equal(mockData);
    });

    it('percentile values should be calculated based on data and boundary values', async () => {
        const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        const boundaries = [0, 5, 25, 75, 95, 100];
        const expectedPercentiles = [0, 1, 5, 15, 19, 21];
        for (const val in boundaries) {
            expect(getPercentile(boundaries[val], data)).to.equal(expectedPercentiles[val]);
        }
    });

    it('should replace query ranges with percentile values', async () => {
        const query = [...mockQuery];
        const expectedUpdatedQuery = [...mockFormattedQuery];
        const results = await SoldPrice.find();
        const updatedQuery = formatQuery(results, query);
        expect(updatedQuery).to.eql(expectedUpdatedQuery);
    });

    afterEach( () => {
        find.restore();
    });

});

const mockData = [
    { 'lat': 1, 'long': 2, 'price': 0 },
    { 'lat': 3, 'long': 4, 'price': 1 },
    { 'lat': 5, 'long': 6, 'price': 2 },
    { 'lat': 7, 'long': 8, 'price': 3 },
    { 'lat': 9, 'long': 10, 'price': 4 },
    { 'lat': 11, 'long': 12, 'price': 5 },
    { 'lat': 13, 'long': 14, 'price': 6 },
    { 'lat': 15, 'long': 16, 'price': 7 },
    { 'lat': 17, 'long': 18, 'price': 8 },
    { 'lat': 19, 'long': 20, 'price': 9 },
    { 'lat': 21, 'long': 22, 'price': 10 },
    { 'lat': 23, 'long': 24, 'price': 11 },
    { 'lat': 25, 'long': 26, 'price': 12 },
    { 'lat': 27, 'long': 28, 'price': 13 },
    { 'lat': 29, 'long': 30, 'price': 14 },
    { 'lat': 31, 'long': 32, 'price': 15 },
    { 'lat': 33, 'long': 34, 'price': 16 },
    { 'lat': 35, 'long': 36, 'price': 17 },
    { 'lat': 37, 'long': 38, 'price': 18 },
    { 'lat': 39, 'long': 40, 'price': 19 },
    { 'lat': 41, 'long': 42, 'price': 20 }
];

const mockQuery = [
    { name: 'lowest', low: 0, high: 5 },
    { name: 'low', low: 5, high: 25 },
    { name: 'medium', low: 25, high: 75 },
    { name: 'high', low: 75, high: 95 },
    { name: 'highest', low: 95, high: 100 }
];

const mockFormattedQuery = [
    { name: 'lowest', low: 0, high: 1 },
    { name: 'low', low: 1, high: 5 },
    { name: 'medium', low: 5, high: 15 },
    { name: 'high', low: 15, high: 19 },
    { name: 'highest', low: 19, high: 21 }
];