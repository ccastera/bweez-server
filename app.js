const express = require('express');
const app = express();
const fs = require('fs').promises;
const qrcode = require('qrcode');
const Photo = require('./models/photo');

const { PORT = 5000 } = process.env;

app.use(express.json());

app.get('/images', (req, res) => {
    Photo.all((err, rows) => {
        if (err) return res.status(400).send('Une erreur est survenue');
        res.send(rows);
    });
});

app.post('/images', (req, res) => {
    let base64Image = req.body.picture.split(';base64,').pop();
    let picturePath = 'images/' + Date.now() + '.jpg';

    fs.writeFile(picturePath, base64Image, { encoding: 'base64' })
    .then(() => {
        let pictureUrl = `http://localhost:${PORT}/${picturePath}`;

        qrcode.toDataURL(pictureUrl, (err, bitmapData) => {
            if (err) return res.status(400).send('Impossible de générer l\'url de cette image');

            new Photo(pictureUrl, bitmapData)
            .save((err, rows) => {
                if (err) return res.status(406).send('Une erreur est survenue lors de la sauvegarde de votre photo');
                res.status(201).send(bitmapData);
            });
        });
    })
    .catch((error) => {
        res.send(400).send('Impossible de sauvegarder votre image');
    });
});

app.get('/images/:imageName', (req, res) => {
    let filepath = 'images\\' + req.params.imageName;
    
    fs.stat(filepath)
    .then((stats) => {
        fs.readFile(filepath)
        .then((datas) => {
            res.setHeader('Content-type', 'image/jpg');
            res.send(datas);
        })
        .catch((err) => {
            res.sendStatus(400);
        });
    })
    .catch((err) => {
        res.status(406).send('Image non disponible');
    });
});

app.post('/images/qrcode', (req, res) => {
    Photo.get(req.body.qrcode, (err, rows) => {
        if (err) return res.status(400).send('Une erreur est survenue');

        if (rows[0]) res.send(rows[0].picture_url);
        else res.status(404).send('qrcode non reconnu');
    });
});

app.listen(PORT, () => {
    console.log (`BWEEZ test server started on port ${PORT}`);
});
