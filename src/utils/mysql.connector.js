const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const configOptions = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'accomodation'
}

const dbConnection = mysql.createConnection(configOptions)

module.exports = dbConnection

