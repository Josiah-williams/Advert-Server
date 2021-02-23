const bcrypt = require('bcryptjs');
const noPassword = bcrypt.hashSync("123456", 10);
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "danielAsuquo15@gmail.com",
          first_name: "Daniel",
          last_name: "Asuquo",
          password: noPassword,
        },
        {
          email: "josiahdamiwilliams@gmail.com",
          first_name: "josiah",
          last_name: "williams",
          password: noPassword,
        },
      ]);
    });
};