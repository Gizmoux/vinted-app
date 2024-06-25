const express = require('express');
const router = express.Router();
const uid2 = require('uid2');
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const User = require('../models/User');

// **Create****
router.post('/user/signup', async (req, res) => {
	const { username, email, password, newletter } = req.body;

	try {
		const user = await User.findOne({ email: email });

		if (user) {
			res.status(409).json({ message: 'Mail already has an account' });
		} else {
			if (email && username && password) {
				// 1) Encrypter le mdp
				const token = uid2(64);
				const salt = uid2(16);
				const hash = SHA256(password + salt).toString(encBase64);
				// 2) Créer un new User

				const newUser = new User({
					email: email,
					account: {
						username: username,
					},
					newsletter: newletter,
					token: token,
					hash: hash,
					salt: salt,
				});
				// 3) Sauvegarder ce user dans la BDD
				await newUser.save();
				// 4) Répondre au client
				res.status(200).json({
					_id: newUser._id,
					token: newUser.token,
					account: newUser.account,
				});
			} else {
				res.status(400).json({
					message: 'Missing parameters',
				});
			}
		}
	} catch (error) {
		res.status(400).json({ message: 'pas de user crée' });
	}
});
// LOgin
router.post('/user/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (user) {
			// Vérifier que le mdp est le bon
			const hashToVerify = SHA256(password + user.salt).toString(encBase64);
			if (hashToVerify === user.hash) {
				res.status(200).json({
					_id: user._id,
					token: user.token,
					account: user.account,
				});
			} else {
				res.status(401).json({
					message: 'Unauthorized',
				});
			}
		} else {
			res.status(401).json({
				message: 'Unauthorized',
			});
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
// **Read**
router.get('/', async (req, res) => {
	console.log('route : /read');
	res.json('Hellooo route get');
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// **Update**
router.post('/update', async (req, res) => {
	console.log('route : /update');
	console.log(req.fields);
	try {
		if (req.fields.id && req.fields.age) {
			const student = await Student.findOne({ _id: req.fields.id });
			student.age = req.fields.age;
			await student.save();
			res.json(student);
		} else {
			res.status(400).json({ message: 'Missing parameter' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// **Delete**
router.post('/delete', async (req, res) => {
	try {
		if (req.fields.id) {
			// si l'id a bien été transmis
			// On recherche le "student" à modifier à partir de son id et on le supprime :
			await Student.findByIdAndDelete(req.fields.id);
			// On répond au client :
			res.json({ message: 'Student removed' });
		} else {
			// si aucun id n'a été transmis :
			res.status(400).json({ message: 'Missing id' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
