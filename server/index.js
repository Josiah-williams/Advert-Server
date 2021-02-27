const server = require('./server');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});