const noPassword = "$2a$12$ZQwXBTq7UMgmugpy5zz9SOdG4JvEa3Bj5MofQl9fIMFb1wTSGU9.C";
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
          password:noPassword,
        },
        {
          email: "josiahdamiwilliams@gmail.com",
          first_name: "josiah",
          last_name: "williams",
          password:noPassword,
        },
      ]);
    });
};