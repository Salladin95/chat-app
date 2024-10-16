exports.up = function (knex) {
  return knex.schema.hasTable('attachments').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('attachments', (table) => {
        table.increments('id').primary();
        table.integer('messageId').unsigned().notNullable();
        table.foreign('messageId').references('messages.id').onDelete('CASCADE');
        table.string('url').notNullable();
        table.string('type');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('attachments');
};
