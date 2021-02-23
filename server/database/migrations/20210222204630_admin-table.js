
exports.up = function(knex) {
    return knex.schema.createTable("admin", (table) => {
      table.increments(); 
      table.string("email").notNullable().unique();
      table.string("first_name", 128).notNullable();
      table.string("last_name", 128).notNullable();
      table.string("password", 128).notNullable();
      table.boolean("is_admin").notNullable();
    });
  }  
  
  exports.down = function(knex) {
     return knex.schema
    .dropTableIfExists('admin')
  };
    