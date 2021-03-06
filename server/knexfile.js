// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection:  process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
    },
    },
  };

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
}

