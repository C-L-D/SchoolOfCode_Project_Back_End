"use strict";

//const AWS = require("aws-sdk");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2019.11.21" });

const recordingTable = process.env.DYNAMODB_RECORDING_TABLE;

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

// module.exports.getAllRecordings = async (event, context, callback) => {
//   console.log("CONTEXT:", context);
//   console.log("EVENT:", event);
//   const res = await fetch(`https://zoom.us//users/${userId}/recordings`);
//   /*const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: event,
//     }),
//   };*/
//   const data = await res.json();
//   console.log(data);

//   callback(null, response(200, data));
// };

module.exports.getAllRecordings = (event, context, callback) => {
  return db
    .scan({
      TableName: recordingTable,
    })
    .promise()
    .then((res) => callback(null, response(200, res.Items)))

    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.getRecordingById = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: recordingTable,
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

module.exports.addRecording = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  const recording = {
    id: `${reqBody.date}`,
    date: reqBody.date,
    title: reqBody.title,
    link: reqBody.link,
    thumbnail: reqBody.thumbnail,
  };

  return db
    .put({
      TableName: recordingTable,
      Item: recording,
    })
    .promise()
    .then(() => {
      callback(null, response(200, item));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

module.exports.updateRecording = (event, context, callback) => {
  const id = event.pathParameters.id;

  const reqBody = JSON.parse(event.body);

  const recording = {
    id: reqBody.date,
    date: reqBody.date,
    title: reqBody.title,
    link: reqBody.link,
    thumbnail: reqBody.thumbnail,
  };

  return db
    .put({
      TableName: recordingTable,
      Item: recording,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

module.exports.deleteRecording = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id,
    },
    TableName: recordingTable,
  };

  return db
    .delete(params)

    .promise()
    .then(() =>
      callback(null, response(200, { message: `${id} deleted successfully` }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
