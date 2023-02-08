const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
    region: "us-east-1",
    apiVersion: "2012-08-10",
});

exports.handler = (event, context, callback) => {
    const params = {
        TableName: "tb_subscriptions"
    };
    
    dynamodb.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            const subs = data.Items.map(item => {
                return {
                    id: item.id.S,
                    userId: item.userId.S,
                    appId: item.appId.S,
                    created_at: item.created_at.S,
                };
            });
            callback(null, {
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(subs)
            });
        } 
    });
};
