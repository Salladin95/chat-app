exports.up = function (knex) {
  return knex.schema.hasTable('conferences').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('conferences', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('adminId').unsigned().notNullable();
        table.foreign('adminId').references('users.id').onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('conferences');
};
