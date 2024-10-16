exports.up = function (knex) {
  return knex.schema.hasTable('messages').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('messages', (table) => {
        table.increments('id').primary();
        table.integer('senderId').unsigned().notNullable();
        table.foreign('senderId').references('users.id').onDelete('CASCADE');
        table.integer('chatId').unsigned().notNullable();
        table.foreign('chatId').references('chats.id').onDelete('CASCADE');
        table.text('content').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('editedAt').nullable();
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('messages');
};
