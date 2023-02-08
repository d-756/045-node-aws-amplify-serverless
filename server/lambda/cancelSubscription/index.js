const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
    region: "us-east-1",
    apiVersion: "2012-08-10",
});

exports.handler = (event, context, callback) => {
    const params = {
        Key: {
            id: {
                S: event.id
            }
        },
        TableName: "tb_subscriptions"
    };
    dynamodb.deleteItem(params, (err, data) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
            callback(null, {
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(data)
            });
        }
    });
};
