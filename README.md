# Installation

- npm init -y
- npm install nodemon
- Dans package.json, j'ai ajouté dans script: "start: nodemon server.js"
- npm install express mongoose uid2 crypto-js dotenv cors

# Connexion à la base de données

- mongoose.connect('mongodb://127.0.0.1:27017/vinted-app'); (Ne pas mettre localhost)

# Lancer le server

- npm start
