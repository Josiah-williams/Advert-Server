const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '4thenewJosiah',
  host: 'localhost',
  port: 5432,
  database: 'Adverts'
});

module.exports = { pool };