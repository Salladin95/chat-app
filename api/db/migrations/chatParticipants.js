exports.up = function (knex) {
  return knex.schema.hasTable('chat_participants').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('chat_participants', (table) => {
        table.increments('id').primary();
        table.integer('chatId').unsigned().notNullable();
        table.foreign('chatId').references('chats.id').onDelete('CASCADE');
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('users.id').onDelete('CASCADE');
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chat_participants');
};
