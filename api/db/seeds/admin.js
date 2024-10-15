/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 0,
      username: 'ADMIN',
      email: 'admin@admin.com',
      password: '$2a$10$WPnJGF07tJ5qJbglMiKQ8OYnzNd0iBprzU5KaScDWny5JVZUo8elO',
      role: 'ROLE_ADMIN',
    },
  ]);
};
