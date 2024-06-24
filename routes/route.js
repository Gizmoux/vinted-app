const express = require('express');
const router = express.Router();
const User = require('../models/User');

// **Create**
router.post('/user/signup', async (req, res) => {
	console.log('route : user/signup');
	console.log(req.body);
	try {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			newsletter: true,
		});
		await newUser.save();
		res.json(newUser);
	} catch (error) {
		res.status(400).json({ message: 'pas de user crée' });
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
