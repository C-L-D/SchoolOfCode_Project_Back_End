"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });

const bootcamperTable = process.env.DYNAMODB_BOOTCAMPER_TABLE;

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

module.exports.getAllBootcampers = (event, context, callback) => {
  return db
    .scan({
      TableName: bootcamperTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getBootcamperById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperTable,
  };

  return db
    .get(params)

    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else
        callback(
          null,
          response(404, { error: "No bootcamper with that name found" })
        );
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.addBootcamper = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const bootcamper = {
    id: reqBody.firstName,
    createdAt: new Date().toISOString(),
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    image: reqBody.bootcamperImage,
    link: reqBody.link,
  };

  return db
    .put({
      TableName: bootcamperTable,
      Item: bootcamper,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateBootcamper = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const bootcamper = {
    id: id,
    createdAt: new Date().toISOString(),
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    image: reqBody.bootcamperImage,
    link: reqBody.link,
  };

  return db
    .put({
      TableName: bootcamperTable,
      Item: bootcamper,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteBootcamper = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
