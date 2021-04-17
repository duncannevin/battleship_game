const ServerConfig = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4444
};

const DBConfig = {
    name: process.env.DB_NAME || 'battleship_game',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    forceSync: (process.env.DB_FORCE_SYNC === 'true')
};

const JWTConfig = {
    secret: process.env.JWT_SECRET || '23908j98jfa98jh90a8weu98',
    issuer: process.env.JWT_ISSUER || `http://${DBConfig.host}:${DBConfig.port}`,
    realm: process.env.JWT_REALM || 'com.duncannevin'
};

const UpdaterConfig = {
    location: process.env.BATTLESHIP_UPDATER_LOCATION || 'http://localhost:5555'
}

module.exports = { ServerConfig, DBConfig, JWTConfig, UpdaterConfig };
