const sql = require('./node_modules/mssql')
//config
let config = {
  user: 'sa',
  password: 'secret',
  server: 'localhost',
  database: 'database',
};

//conecta no db
sql.connect(config)
  .then(conn => GLOBAL.conn = conn)
  .catch(err => console.log(`error! ${err}`));


function execSQLQuery(sqlQry, res) {
  GLOBAL.conn.request()
    .query(sqlQry)
    .then(result => res.json(result.recordset))
    .catch(err => res.json(err));
}


module.exports = { execSQLQuery };
