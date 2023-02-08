const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const dynamodb = new AWS.DynamoDB({
    region: "us-east-1",
    apiVersion: "2012-08-10",
});

exports.handler = (event, context, callback) => {
    const params = {
        Item: {
            id: {
                S: uuidv4()
            },
            userId: {
                S: event.userId
            },
            appId: {
                S: event.appId
            },
            created_at: {
                S: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        TableName: "tb_subscriptions"
    };
    dynamodb.putItem(params, (err, data) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
            callback(null, {
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                }
            });
        }
    });
    // const response = {
    //     statusCode: 200,
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Credentials': true,
    //     }
    // }
    // callback(null, response);
};
