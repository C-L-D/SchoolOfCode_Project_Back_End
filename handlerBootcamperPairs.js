"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });

const bootcamperPairsTable = process.env.DYNAMODB_BOOTCAMPER_2_TABLE;

function response(statusCode, message) {
  return {
    statusCode: statusCode,

    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };
}

module.exports.getAllBootcamperPairs = (event, context, callback) => {
  return db
    .scan({
      TableName: bootcamperPairsTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getBootcamperPairById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperPairsTable,
  };

  return db
    .get(params)

    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else
        callback(
          null,
          response(404, { error: "No bootcamper pairs for that week found" })
        );
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.addBootcamperPair = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const bootcamperPair = {
    id: `${reqBody.week}`,
    createdAt: new Date().toISOString(),
    week: reqBody.week,
    pairs: reqBody.pairs,
  };

  return db
    .put({
      TableName: bootcamperPairsTable,
      Item: bootcamperPair,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateBootcamperPair = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const bootcamperPair = {
    id: id,
    createdAt: new Date().toISOString(),
    pairs: reqBody.pairs,
  };

  return db
    .put({
      TableName: bootcamperPairsTable,
      Item: bootcamperPair,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteBootcamperPair = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperPairsTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
