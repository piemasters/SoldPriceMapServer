# Sold Price Map Server

This is the server side component of the Sold Price Map technical challenge.
The GraphQL API can be accessed at: https://server.davidnorton.app/graphql

## Local Setup

After cloning the project and running `npm install` to run the server locally you will need to create a file `mongo-details.json` in the root of the project. The file should contain the following:
```
{
  "uri": "mongodb+srv://<USERNAME>:<PASSWORD>@<ADDRESS>/<COLLECTION>?retryWrites=true"
}
```
I have included the data file converted into the JSON format used to populate the database table in `data\sold-price.data.json`.


## Challenge
You have been given a [set of data points](data/sold-price-data.txt), with each item taking the following form:

```
X Y P
```

where `0 <= X < 100` and `0 <= Y < 100`, and `10000 < P < 10000000`.
`X` and `Y` represent the coordinates of a house which has been sold, and `P` is the price in which it was sold. For example, the point "`5 10 100000`" would be interpreted as a house sold for £100,000 at the point `(5, 10)`.

Using this data plot each point on a grid. The points should be filled with a colour representing how expensive a house was in relation to other houses. The choice of colour is up to you, however, you should use a different colour for each of the following groups:

- 0% - 5%
- 5% - 25%
- 25% - 75%
- 75% - 95%
- 95% - 100%

## Technology Stack

Below are the technologies I have chosen to use for the challenge and the reason chosen:
- Node.js - Familiarity of using JS
- Express - Simplify Node.js setup
- GraphQL - Minimise response size. Also having watched some training videos recently, this challenge is a good opportunity to put what I've learnt into practice 
- MongoDB - Familiarity and free to host
- Mocha - Familiarity and simplicity
- Chai - Adds assertion library for testing
- Sinon - Adds stubs for testing

## Solution Design

### API

The GraphQL API should only need one query resolver that receives a set of queries for each range of data required and responds back with the data sorted into groups defined by the query. 

This solution allows for the data to be dynamically queried from the UI via a form, with the number and size of the ranges to be modified by the user.

#### GET pricesByRange

##### Query from Client

The UI will request data from the server by POSTing an array of queries to the GraphQL endpoint. Each query is an object that contains:
 
- `name` - the name of the query to be used for identification
- `low` - the lower range (as a %) of that data it wants
- `high` - the upper range (as a %)of that data it wants

An example query:
```
[
    { name: 'lower-range', low: 0, high: 50 },
    { name: 'upper-range', low: 50, high: 100 }
]
```

##### Response to Client

The server will respond with an array of objects, each corresponding to a provided query object. Each object will contain:
 
- `name` - to link back to the correct query
- `values` - an array containing all matching data that falls into the range provided. 

An example response:
```
[
    { name: 'lower-range', values [...] },
    { name: 'upper-range', values [...] }
]
```

The `values` array will contain objects, each being a matching result from the database. This means it can include:
- `id`
- `lat`
- `long`
- `price`

Example:
```
{ _id: 1, lat: 50, long: 100, price: 500000 }
```

##### Logic

The logic for generating the response from the given query is as follows:

1. Retrieve all data from the database
2. For each range percentage value, determine for the price percentile value
3. For each data entry, check if its value falls between the calculated percentile values of each query and add it to the correct response object


