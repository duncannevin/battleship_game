const ServerConfig = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3333
};

const DBConfig = {
    name: process.env.DB_NAME || 'battleship_game',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root'
};

const JWTConfig = {
    secret: process.env.JWT_SECRET || '23908j98jfa98jh90a8weu98',
    issuer: process.env.JWT_ISSUER || `http://${DBConfig.host}:${DBConfig.port}`,
    realm: process.env.JWT_REALM || 'com.duncannevin'
};

module.exports = { ServerConfig, DBConfig, JWTConfig };
