const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
    region: "us-east-1",
    apiVersion: "2012-08-10",
});

exports.handler = (event, context, callback) => {
    const params = {
        TableName: "tb_applications"
    };
    dynamodb.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            const apps = data.Items.map(item => {
                return {
                    id: item.id.S,
                    name: item.name.S,
                    description: item.description.S,
                    domain: item.domain.S,
                    created_at: item.created_at.S,
                    updated_at: item.updated_at.S,
                    app_client_id: item.app_client_id.S
                };
            });
            callback(null, {
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(apps)
            });
        }
    });
};
