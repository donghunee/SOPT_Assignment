var mysql = require('mysql')
/**
 * Get port from environment and store in Express.
 */
var connection = mysql.createConnection({
  host: "db-sopt-server.cj1bwtnddwit.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "ehdgns2797",
  database: "sopt"
});

module.exports = connection