import knex from 'knex';

export async function connectToDb(uri: knex.Knex.ConnectionConfigProvider | string) {
  return knex({
    client: 'mysql2',
    connection: uri,
  });
}
