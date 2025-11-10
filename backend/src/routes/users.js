const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/auth');


router.post('/register', async (req, res) => {
const { name, email, agency, jobDesc } = req.body;
try {
await db.execute(
'INSERT INTO users (name, email, agency, job_desc) VALUES (?, ?, ?, ?)',
[name, email, agency, jobDesc]
);
res.sendStatus(200);
} catch (err) {
console.error(err);
res.sendStatus(500);
}
});



router.get('/profile', verifyToken, async (req, res) => {
const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [req.user.email]);
res.json(rows[0]);
});


module.exports = router;