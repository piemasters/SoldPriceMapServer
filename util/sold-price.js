const formatQuery = (results, queryData) => {
    return null;
};

const generateResponse = (results, queries) => {
    return [
        {
            'name': 'test',
            'values': [{ 'lat': 1, 'long': 2, 'price': 0 }]
        }
    ];
};

exports.formatQuery = formatQuery;
exports.generateResponse = generateResponse;