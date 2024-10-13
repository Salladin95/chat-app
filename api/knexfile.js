/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: 'mysql://khalid:1111@localhost:3306/chat-db',

    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },
  testing: {
    client: 'mysql2',
    connection: 'mysql://khalid:1111@localhost:3306/chat-db',

    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: 'mysql://khalid:1111@localhost:3306/chat-db',

    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },
};
