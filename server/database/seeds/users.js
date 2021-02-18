exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "danielAsuquo15@gmail.com",
          first_name: "Daniel",
          last_name: "Asuquo",
          password: "nopassword",
          is_admin: false,
        },
        {
          email: "josiahdamiwilliams@gmail.com",
          first_name: "josiah",
          last_name: "williams",
          password: "nopassword",
          is_admin: true,
        },
      ]);
    });
};