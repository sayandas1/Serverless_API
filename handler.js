'use strict';

const DynamoDB = require('aws-sdk/clients/dynamodb');
const documentClient = new DynamoDB.DocumentClient({
  region: 'us-east-1',
  maxRetries: 3,
  httpOptions: {
    timeout: 5000,
  },
});
const NOTES_TABLE_NAME = process.env.NOTES_TABLE_NAME;
const send = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
}
module.exports.createNote = async (event,context,cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = JSON.parse(event.body);
    const params = {
      TableName: NOTES_TABLE_NAME,
      Item: {
        notesId: data.id,
        timestamp: Date.now(),
        title: data.title,
        body: data.body,
      },
      ConditionExpression: 'attribute_not_exists(notesId)',
    };
    await documentClient.put(params).promise();
    cb(null,send(200, params.Item));
  } catch (error) {
    cb(null,send(500, error.message));
  }


};
module.exports.updateNote = async (event,context,cb) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: {
        notesId: id,
      },
      UpdateExpression: 'set #title = :title, #body = :body',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#body': 'body',
      },
      ExpressionAttributeValues: {
        ':title': data.title,
        ':body': data.body,
      },
      ConditionExpression: 'attribute_exists(notesId)',
    };
    await documentClient.update(params).promise();
    cb(null,send(200, data));
  } catch (error) {
    cb(null,send(500, error.message));
  }
};

module.exports.deleteNote = async (event,context,cb) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const id = event.pathParameters.id;
    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: {
        notesId: id,
      },
      ConditionExpression: 'attribute_exists(notesId)',
    };
    await documentClient.delete(params).promise();
    cb(null,send(200, "Note deleted"));
  } catch (error) {
    cb(null,send(500, error.message));
  }

}

module.exports.getAllNotes = async (event,context,cb) => {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
    };
    const data = await documentClient.scan(params).promise();
    cb(null,send(200, data.Items));
  } catch (error) {
    cb(null,send(500, error.message));
  }
}
