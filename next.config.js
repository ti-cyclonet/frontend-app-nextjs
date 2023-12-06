/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "standalone",
  env: {
    NEXT_PUBLIC_APP_URL: "localhost:3000",
    NEXTAUTH_URL: "https://localhost:3000",
    //NEXT_PUBLIC_APP_URL: "https://trunk.d3h60uci504p24.amplifyapp.com",
    //NEXTAUTH_URL: "https://trunk.d3h60uci504p24.amplifyapp.com",
    NEXTAUTH_SECRET: "Jix3D/TDn+3f5CY1iqJ6LNdTR41OfWVSvQxYaded7EM=",
    APP_CRYPT_PHRASE: "myTotallySecretKey",
    //BASEPATH_API_AUTH: "https://9et5tu57tj.execute-api.us-east-1.amazonaws.com",
    //BASEPATH_API_USERS: "http://localhost:3013",
    BASEPATH_API_AUTH: "https://requf0puo7.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_USERS: "https://requf0puo7.execute-api.us-east-1.amazonaws.com",

    /*
   
    BASEPATH_API_CHARGEBOX: "http://localhost:3001",
    BASEPATH_API_CONNECTOR: "http://localhost:3111",
    BASEPATH_API_DASHBOARD: "http://localhost:3211", 
    BASEPATH_API_ERRORs: "http://localhost:3139",
    BASEPATH_API_FUNCTIONALUNIT: "http://localhost:3503",
    BASEPATH_API_KEEPALIVE: "http://localhost:3149",
    BASEPATH_API_TRANSACTIONS: "http://localhost:3101",
    BASEPATH_API_VEHICLES: "http://localhost:3004",
    */
    BASEPATH_API_POWERLIMIT: "https://xixko3l9p8.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_CHARGEBOX: "https://j04x1iqcl6.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_TRANSACTIONS: "https://wtyyfqo2xb.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_CONNECTOR: "https://cy31hi2j1a.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_VEHICLES: "https://x7caiwf79k.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_DASHBOARD: "https://udzct1kzhk.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_ERRORs: "https://dy1tt6n15b.execute-api.us-east-1.amazonaws.com",
    //BASEPATH_API_POWER: "https://xixko3l9p8.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_FUNCTIONALUNIT: "https://1qkn46cn57.execute-api.us-east-1.amazonaws.com",
    BASEPATH_API_OCPPSERVER: "https://064thkhiu1.execute-api.us-east-1.amazonaws.com/default/AOSOCPPServer/api/v1"
  },
    swcMinify: false
};

module.exports = nextConfig;
