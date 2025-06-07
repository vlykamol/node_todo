/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('todos', table => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.string('description', 255);
    table.boolean('completed').defaultTo(false);
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');


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
  return knex.schema.dropTable('todos')
};
