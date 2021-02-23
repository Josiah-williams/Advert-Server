const bcrypt = require('bcryptjs');
const noPassword = bcrypt.hashSync("224455", 10);
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("admin")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("admin").insert([
        {
          email: "danielAsuquo15@gmail.com",
          first_name: "Daniel",
          last_name: "Asuquo",
          password: noPassword,
          is_admin: true
        },
        {
          email: "josiahdamiwilliams@gmail.com",
          first_name: "josiah",
          last_name: "williams",
          password: noPassword,
          is_admin:true
        },
      ]);
    });
};