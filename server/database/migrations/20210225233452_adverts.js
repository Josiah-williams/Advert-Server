
exports.up = function(knex) {
    return knex.schema.createTable("adverts", (table) => {
      table.increments(); 
      table.string("advertName", 128).notNullable();
      table.string("websiteUrl", 128).notNullable();
      table.string("country", 128).notNullable();
      table.string("tags", 128).notNullable();
      table.string("days", 128).notNullable();
      table.string("date", 128).notNullable();
      table.string("dateString", 128).notNullable();
      table.integer("user_id").unsigned().notNullable()
      .references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    });
  }  
  
  exports.down = function(knex) {
     return knex.schema
    .dropTableIfExists('adverts')
  };
    