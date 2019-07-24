const mysql = require('mysql');

class Connector {

    static connection = null;

    static get = () => {
        if (this.connection === null) {
            this.connection = mysql.createConnection({
                host : 'localhost',
                user : 'root',
                password : '',
                database : 'bweez'
            });
        }
        
        return this.connection;
    };

}

module.exports = Connector;
