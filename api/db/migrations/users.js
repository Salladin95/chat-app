exports.up = function (knex) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('avatar');
        table.string('email').unique().notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
