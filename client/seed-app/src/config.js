export default {
    Auth: {
        mandatorySignIn: true,
        region: 'us-east-1',
        // xgenmarketplacedb92bbdb_userpool_db92bbdb-dev
        userPoolId: 'us-east-1_jLQ7tPUQ4',
        identityPoolId: 'us-east-1:e6367cd7-f924-4789-93f7-31640a079b42',
        userPoolWebClientId: 'l2oddo7fpe26b7giq2vhokdfm',
    },
    API: {
        endpoints: [
            {
                name: `xGenMarketAPI`,
                endpoint: 'https://m9ykxb6vli.execute-api.us-east-1.amazonaws.com/dev',
                region: 'us-east-1'
            }
        ]
    }
}