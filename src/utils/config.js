const config = {
    app: {
        host: process.env.HOST,
        port: process.env.PORT,
    },
    rabbitmq: {
        server: process.env.RABBITMQ_SERVER,
    },
    redis: {
        host: process.env.REDIS_SERVER,
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        addres: process.env.MAIL_ADDRESS,
        password: process.env.MAIL_PASSWORD,
    }
};

module.exports = config;