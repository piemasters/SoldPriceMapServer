const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type SoldPrice {
        _id: ID!
        lat: Int!
        long: Int!
        price: Int!
    }
       
    type SoldPriceData {
        name: String!
        values: [SoldPrice!]!
    }
    
    input QuerySearch {
        name: String!
        low: Int!
        high: Int!
    }
    
    type RootQuery {
        pricesByRange(queryData: [QuerySearch]): [SoldPriceData!]!
    }
    
    schema {
        query: RootQuery
    }
`);