/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();

    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('updated_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('deleted_at');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
