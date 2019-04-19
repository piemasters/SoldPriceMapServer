const { formatQuery, generateResponse } = require('../util/sold-price');

const SoldPrice = require('../models/sold-price.schema');

module.exports = {

    pricesByRange: async function({ queryData }, req) {

        // Get all sold data from database
        const results = await SoldPrice.find();

        // Create a copy of the query with low/high ranges replaced with percentiles
        const updatedQuery = formatQuery(results, queryData);

        // Generate the response with the database results stored in the correct ranges
        const response = generateResponse(results, updatedQuery);

        return response;

    }

};