const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'zakariaels',
      password : '',
      database : 'smart-brain-db'
    }
  });

const app = express();

app.use(express.json());
app.use(cors());

//ROOT ENDPOINT
app.get('/', (req, res) => {
    res.send(db.users);
});

//SIGNIN ENDPOINT
app.post('/signin', (req, res) => { 
    signin.handleSignin(req, res, db, bcrypt)
});

//REGISTER ENDPOINT
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
});

//PROFILE/:ID ENDPOINT
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(3002, () => {
    console.log('app is running on port 3002')
});