const mysql = require('mysql');
const Connector = require('./connector');

class Photo {

    constructor (fileUri, qrcode) {
        this.fileUri = fileUri;
        this.qrcode = qrcode;
        this.connection = Connector.get();
    }

    save = (cb) => {
        let insert = 'INSERT INTO photo VALUES(NULL,?,?);';
            insert = mysql.format(insert, [this.fileUri, this.qrcode]);
        this.connection.query(insert, cb);
    };

    static get = (qrcode, cb) => {
        const connection = Connector.get();
        let select = 'SELECT * FROM photo WHERE qrcode=?;';
            select = mysql.format(select, [qrcode]);
        connection.query(select, cb);
    };

    static all = (cb) => {
        const connection = Connector.get();
        let select = 'SELECT * FROM photo;';
        connection.query(select, cb);
    };
    
}

module.exports = Photo;
