"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });

const eventTable = process.env.DYNAMODB_EVENT_TABLE;

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

module.exports.getAllEvents = (event, context, callback) => {
  return db
    .scan({
      TableName: eventTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getEventById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: eventTable,
  };

  return db
    .get(params)

    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else
        callback(null, response(404, { error: "No event on that day found" }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.addEvent = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const item = {
    id: reqBody.date,
    createdAt: new Date().toISOString(),
    date: reqBody.date,
    event: reqBody.event,
  };

  return db
    .put({
      TableName: eventTable,
      Item: item,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateEvent = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const item = {
    id: reqBody.date,
    createdAt: new Date().toISOString(),
    date: reqBody.date,
    event: reqBody.event,
  };

  return db
    .put({
      TableName: eventTable,
      Item: item,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteEvent = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: eventTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getEventRangeById = async (event, context, callback) => {
  console.log(JSON.stringify(db));
  const id = event.pathParameters.id;
  let date = new Date(id);
  // for (let i = 2; i < 8; i++) {
  //   let id[i] = new Date(id);
  //   id[i].setDate(id[i-1].getDate() + 1);
  function next() {
    return new Date(date.setDate(date.getDate() + 1))
      .toISOString()
      .slice(0, 10);
  }
  const params = {
    RequestItems: {
      eventTable: {
        Keys: [
          { id: id },
          {
            id: next(),
          },
          {
            id: next(),
          },
          {
            id: next(),
          },
          {
            id: next(),
          },
          {
            id: next(),
          },
          {
            id: next(),
          },
        ],
      },
    },
  };

  //return
  let prom = await db.batchGet(params).promise();
  console.log(prom);
  return response(200, "promise logged");
  /*.then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else
        callback(null, response(404, { error: "No event on that day found" }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));*/
};
