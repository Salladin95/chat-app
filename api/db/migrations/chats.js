exports.up = function (knex) {
  return knex.schema.hasTable('chats').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('chats', (table) => {
        table.increments('id').primary();
        table.boolean('isGroup').defaultTo(false);
        table.string('groupName');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chats');
};
