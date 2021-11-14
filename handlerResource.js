"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });
const { v4: uuidv4 } = require("uuid");

const resourceTable = process.env.DYNAMODB_RESOURCE_TABLE;

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

module.exports.getAllResources = (event, context, callback) => {
  return db
    .scan({
      TableName: resourceTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getResourceById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: resourceTable,
  };

  return db
    .get(params)

    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else
        callback(
          null,
          response(404, { error: "No resource with that id found" })
        );
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.addResource = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const resource = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    week: reqBody.week,
    topic: reqBody.topic,
    resource: reqBody.resource,
    color: reqBody.color,
    link: reqBody.link,
    thumbnail: reqBody.thumbnail,
    description: reqBody.description,
    topicIcon: reqBody.topicIcon,
  };

  return db
    .put({
      TableName: resourceTable,
      Item: resource,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateResource = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const resource = {
    id: id,
    createdAt: new Date().toISOString(),
    week: reqBody.week,
    topic: reqBody.topic,
    resource: reqBody.resource,
    color: reqBody.color,
    link: reqBody.link,
    thumbnail: reqBody.thumbnail,
  };

  return db
    .put({
      TableName: resourceTable,
      Item: resource,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteResource = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: resourceTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
