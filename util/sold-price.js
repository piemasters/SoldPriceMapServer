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
    return [
        {
            'name': 'test',
            'values': [{ 'lat': 1, 'long': 2, 'price': 0 }]
        }
    ];
};

exports.getPercentile = getPercentile;
exports.formatQuery = formatQuery;
exports.generateResponse = generateResponse;