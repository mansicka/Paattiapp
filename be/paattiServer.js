const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

app.use(express.json());
express.urlencoded({ limit: '5mb', extended: true });

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('paatti.db');


// back kuuntelee porttia 8080
app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

// Reititys on pelkkä / esim. localhost:8080/
app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Toimii' })
});

// Reititys on /henkilo/all esim. localhost:8080/henkilo/all
app.get('/users/all', (req, res, next) => {
    db.all("SELECT * FROM users", (error, results) => {
        if (error) throw error;

        /* Jos kuvia olisi useita ja kannassa (ei hakemistossa)
                for (var i = 0; i < results.length; i++) {
                    if (results[i].kuva != null) {
                        results[i].kuva = results[i].kuva.toString('base64');
                    }
                }
        */
        return res.status(200).json(results);
    });
});


app.get('/users/:id', (req, res, next) => {
    let id = req.params.id;
    db.get('SELECT * FROM users where name=?', [id], (error, result) => {
        if (error) throw error;

        if (typeof (result) == 'undefined') {
            return res.status(200).send({});
        }

        if (result.kuva != null) {
            result.kuva = result.kuva.toString('base64');
        }

        return res.status(200).json(result);
    });
});


// Kuvan lataaminen palvelimen hakemistoon
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './img')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// Kuva lisätään hakemistoon
// Ensin tehdään upload ja sitten vasta tämä
app.post('/users/add', upload.single('kuva'), (req, res, next) => {
    // Lomakkeelta tulleet tiedot
    let tap = req.body;
    let kuva = null;

    // Jos tuli tiedosto, otetaan sen nimi kantaan laittamista varten
    if (req.file) {
        kuva = req.file.originalname;
    }

    db.run('INSERT INTO users (name, email, puh, kuva) VALUES (?, ?, ?, ?)', [tap.name, tap.email, tap.puh, kuva], function (error, result) {
        if (error) throw error;

        return res.status(200).json({ count: this.changes });
    })
})

app.get('/user/:id', (req, res, next) => {
    let id = req.params.id;
    db.get('SELECT * FROM users where name=?', [id], (error, result) => {
        if (error) throw error;

        if (typeof (result) == 'undefined') {
            return res.status(200).send({});
        }
        /* Jos kuva olisi talletettu kantaan
                    if (result.kuva != null) {
                      result.kuva = result.kuva.toString('base64');
                    }
        */
        return res.status(200).json(result);
    });
});

app.get('/users/delete/:id', (req, res, next) => {
    // Otetaan parametrina tulleen henkilon id
    let id = req.params.id;

    // Kuvan poistamienen puuttuu ratkaisusta
    db.run('DELETE FROM users WHERE id = ?', [id], function (error, result) {
        if (error) throw error;

        return res.status(200).json({ count: this.changes });
    });

});

app.get('/dl/:file', (req, res, next) => {
    var file = './img/' + req.params.file;
    res.download(file)
});
//Tähän purchases

app.post('/purchases/add', upload.single('kuva'), (req, res, next) => {
    // Lomakkeelta tulleet tiedot
    let tap = req.body;
    let kuva = null;

    if (req.file) {
        kuva = req.file.originalname;
    }
    db.run('INSERT INTO purchases (kuvaus, hinta, hankkija, kuva) VALUES (?, ?, ?, ?)', [tap.kuvaus, tap.hinta, tap.hankkija, kuva], function (error, result) {
        if (error) throw error;

        return res.status(200).json({ count: this.changes });
    })
})
app.get('/purchases/all', (req, res, next) => {
    db.all("SELECT * FROM purchases", (error, results) => {
        if (error) throw error;


        return res.status(200).json(results);
    });
});

app.get('/purchases/:id', (req, res, next) => {
    let id = req.params.id;
    db.get('SELECT * FROM purchases where id=?', [id], (error, result) => {
        if (error) throw error;

        if (typeof (result) == 'undefined') {
            return res.status(200).send({});
        }
        /* Jos kuva olisi talletettu kantaan
                    if (result.kuva != null) {
                      result.kuva = result.kuva.toString('base64');
                    }
        */
        return res.status(200).json(result);
    });
});

app.get('/purchases/user/:id', (req, res, next) => {
    let id = req.params.id;
    db.all('SELECT * FROM purchases WHERE hankkija = ?', [id], (error, result) => {
        if (error) throw error;

        if (typeof (result) == 'undefined') {
            return res.status(200).send({});
        }
        return res.status(200).json(result);
    });
});

///!!!! 
app.get('/clearusers2222', (req, res, next) => {
    db.all("DELETE FROM Users", (error, results) => {
        if (error) throw error;

        return res.status(200).json(results);
    });
});



///!!!!
app.get('/getusernames', (req, res, next) => {
    db.all("SELECT name FROM Users", (error, results) => {
        if (error) throw error;

        return res.status(200).json(results);
    });
});

app.get('/resetpurchases', (req, res, next) => {
    db.all("DELETE FROM purchases", (error, results) => {
        if (error) throw error;

        return res.status(200).json(results);
    });
});

app.get('/deletepurchasetable', (req, res, next) => {
    db.all("DROP TABLE purchases", (error, results) => {
        if (error) throw error;

        return res.status(200).json(results);
    });
});


// Jos mikään aiempi reititys on sopinut, silloin suoritetaan tämä
app.get('*', (req, res, next) => {
    return res.status(404).send({ error: true, message: 'Ei pyydettyä palvelua' })
});
