const { Client } = require("pg");

const client = new Client({
    connectionString: "postgresql://postgres:password@localhost/hng_task_two"
});

client.connect();

module.exports = client;