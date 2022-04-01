const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

//create the get request
app.get('/users', cors(), async (req, res) => {
    // const STUDENTS = [

    //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
    //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
    //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
    //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
    //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
    // ];
    // res.json(STUDENTS);
    try{
        const { rows: users } = await db.query('SELECT * FROM users');
        res.send(users);
    } catch (e){
        return res.status(400).json({e});
    }
});

//create the POST request
app.post('/api/users', cors(), async (req, res) => {
    const newUser = { username: req.body.username, password: req.body.password}
    //console.log([newUser.firstname, newUser.lastname]);
    const result = await db.query(
        'INSERT INTO users(usernaame, password, wins) VALUES($1, $2, $3) RETURNING *',
        [newUser.username, newUser.password]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});


// // console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});