const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chedolar_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');

    connection.query('CREATE DATABASE IF NOT EXISTS chedolar_db', (err, results) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database ensured. pasa a crear la base de datos');

        connection.changeUser({ database: 'chedolar_db' }, (err) => {
            if (err) {
                console.error('Error switching to chedolar_db:', err);
                return;
            }

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS usuarios (
                    id_usuario SERIAL NOT NULL, 
                    email VARCHAR(100) NOT NULL,
                    password VARCHAR(100),
                    nombre VARCHAR(30), 
                    apellido VARCHAR(30),
                    id_tipo_usuario VARCHAR(1) NOT NULL,
                    saldo_ars NUMERIC, 
                    saldo_usd NUMERIC,
                    foreign key (id_tipo_usuario) references tipo_usuario (id_tipo_usuario),
                    primary key (id_usuario)
                );
            `;
            connection.query(createTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creating table:', err);
                    return;
                }
                console.log('Table ensured. - Crea la tabla en CHEDOLAR');
            });
        });
    });
});

module.exports = connection;
