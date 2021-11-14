"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });

const energiserTable = process.env.DYNAMODB_ENERGISER_TABLE;

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

module.exports.getAllEnergisers = (event, context, callback) => {
  return db
    .scan({
      TableName: energiserTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getEnergiserById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: energiserTable,
  };

  return db
    .get(params)

    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else
        callback(
          null,
          response(404, { error: "No energiser with that name found" })
        );
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.addEnergiser = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const energiser = {
    id: reqBody.name,
    createdAt: new Date().toISOString(),
    name: reqBody.name,
    description: reqBody.description,
    link: reqBody.link,
    logo: reqBody.logo,
    screenshot: reqBody.screenshot,
    color: reqBody.color,
    bootcamperImage: reqBody.bootcamperImage,
  };

  return db
    .put({
      TableName: energiserTable,
      Item: energiser,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateEnergiser = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const energiser = {
    id: id,
    createdAt: new Date().toISOString(),
    name: reqBody.name,
    description: reqBody.description,
    link: reqBody.link,
    logo: reqBody.logo,
    screenshot: reqBody.screenshot,
    color: reqBody.color,
  };

  return db
    .put({
      TableName: energiserTable,
      Item: energiser,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteEnergiser = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: energiserTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
