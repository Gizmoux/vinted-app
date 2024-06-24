const mongoose = require('mongoose');

const User = mongoose.model('User', {
	username: String,
	email: String,
	password: String,
	newsletter: Boolean,
});

module.exports = User;
