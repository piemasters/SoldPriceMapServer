const getPercentile = (boundary, values) => {
    if (boundary === 0) {
        // If the boundary value is 0, return the lowest value
        return values[0];
    } else if (boundary === 100) {
        // If the boundary value is 100, return the highest value + 1
        return values.slice(-1)[0] + 1;
    } else {
        // Return the calculated percentile
        return values[Math.ceil(values.length * (boundary / 100)) - 1];
    }
};

const formatQuery = (results, queryData) => {
    const updatedQuery = [];

    // Create a list of all prices in ascending order
    const prices = results.map(a => a.price).sort((a, b) => a - b);

    for (const q in queryData) {
        updatedQuery.push(
            {
                name: queryData[q].name,
                low: getPercentile(queryData[q].low, prices),
                high: getPercentile(queryData[q].high, prices)
            }
        );
    }
    return updatedQuery
};

const generateResponse = (results, queries) => {
    let response = [];

    // Setup response template with each range group
    for (const q in queries) {
        response.push({ name: queries[q].name, values: [] });
    }
    // Add each result to the correct range group
    for (const point in results) {
        for (const query in queries) {
            // If the results point falls within the range add it to the group
            if (results[point].price >= queries[query].low && results[point].price < queries[query].high) {
                response[query].values.push(results[point]);
                break;
            }
        }
    }
    return response;
};

exports.getPercentile = getPercentile;
exports.formatQuery = formatQuery;
exports.generateResponse = generateResponse;