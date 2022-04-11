const express = require('express');

const { randomBytes } = require('crypto');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = {};

app.get('/users', (_req, res) => {
    return res.status(200).send(Object.values(users));
});
app.post('/users', (req, res) => {
    const { username } = req.body;
    if (Object.values(users).includes(username)){
        return res.status(409).send("Error - User Exists");
    }
    const id = randomBytes(4).toString('hex');
    users[id] = username;
    return res.status(201).end();
});

app.listen(4000, () => {
    console.log("Listening on port 4000")
})