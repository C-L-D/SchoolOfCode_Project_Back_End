"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });

const bootcamperFoursTable = process.env.DYNAMODB_BOOTCAMPER_4_TABLE;

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

module.exports.getAllBootcamperFours = (event, context, callback) => {
  return db
    .scan({
      TableName: bootcamperFoursTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getBootcamperFourById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperFoursTable,
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

module.exports.addBootcamperFour = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const bootcamperFour = {
    id: `${reqBody.week}`,
    createdAt: new Date().toISOString(),
    week: reqBody.week,
    groups: reqBody.groups,
  };
  console.log("bootcamper:", bootcamperFour);

  return db
    .put({
      TableName: bootcamperFoursTable,
      Item: bootcamperFour,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateBootcamperFour = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const bootcamperFour = {
    id: id,
    createdAt: new Date().toISOString(),
    groups: reqBody.groups,
  };

  return db
    .put({
      TableName: bootcamperFoursTable,
      Item: bootcamperFour,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteBootcamperFour = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: bootcamperFoursTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
