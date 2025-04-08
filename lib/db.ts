// eslint-disable-next-line
const sql = require('mssql')
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
}

async function getConnection() {
    let pool
    if (!pool) pool = await sql.connect(config)
    return pool
}

export { getConnection, sql }
