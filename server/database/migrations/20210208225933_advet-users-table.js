
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments(); 
    table.string("email").notNullable().unique();
    table.string("first_name", 128).notNullable();
    table.string("last_name", 128).notNullable();
    table.string("password", 128).notNullable();
  });
};  

exports.down = function(knex) {
   return knex.schema
  .dropTableIfExists('users')
};
  
