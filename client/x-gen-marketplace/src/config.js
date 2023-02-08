export default {
    Auth: {
        mandatorySignIn: true,
        region: 'us-east-1',
        // xgenmarketplacedb92bbdb_userpool_db92bbdb-dev
        userPoolId: 'us-east-1_jLQ7tPUQ4',
        identityPoolId: 'us-east-1:e6367cd7-f924-4789-93f7-31640a079b42',
        userPoolWebClientId: 'l2oddo7fpe26b7giq2vhokdfm',

        // XGen Team User Pool
        // userPoolId: 'us-east-1_MULM4hRYg',
        // identityPoolId: 'us-east-1:2f9a772b-6b4a-42d5-b0c7-a51bf72859ae',
        // userPoolWebClientId: '6gtkeamcas2ffkr7secork4ucq'
    },
    API: {
        endpoints: [
            {
                name: 'xGenMarketAPI',
                endpoint: ' https://m9ykxb6vli.execute-api.us-east-1.amazonaws.com/dev',
                region: 'us-east-1'
            }
        ]
    }
}