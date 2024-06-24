// Imports des packages :
const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la BDD :
mongoose.connect('mongodb://127.0.0.1:27017/vinted-app');

const signup = require('./routes/signup');
app.use(signup);

app.listen(3000, () => {
	console.log('Server started Vinted-app!!');
});
