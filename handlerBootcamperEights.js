"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });

const bootcamperEightsTable = process.env.DYNAMODB_BOOTCAMPER_8_TABLE;

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

module.exports.getAllBootcamperEights = (event, context, callback) => {
  return db
    .scan({
      TableName: bootcamperEightsTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getBootcamperEightById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperEightsTable,
  };

  return db
    .get(params)

    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else
        callback(
          null,
          response(404, { error: "No bootcamper groups for that week found" })
        );
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.addBootcamperEight = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const bootcamperEight = {
    id: `${reqBody.week}`,
    createdAt: new Date().toISOString(),
    week: reqBody.week,
    groups: reqBody.groups,
  };
  console.log("bootcamper:", bootcamperEight);

  return db
    .put({
      TableName: bootcamperEightsTable,
      Item: bootcamperEight,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateBootcamperEight = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const bootcamperEight = {
    id: id,
    createdAt: new Date().toISOString(),
    groups: reqBody.groups,
  };

  return db
    .put({
      TableName: bootcamperEightsTable,
      Item: bootcamperEight,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteBootcamperEight = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperEightsTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
