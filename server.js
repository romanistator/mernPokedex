const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');
const app = express();
const path = require('path');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client')))

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// Routes
app.use('/api/user', userRoutes);

// Serveur
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
