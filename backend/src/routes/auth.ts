const express = require('express');
const router = express.Router();


router.post('/govaa-login', (req, res) => {
const { email, password } = req.body;
if (password === '123456') {
return res.json({ name: 'name', email });
}
res.status(403).json({ error: 'Invalid credentials' });
});


module.exports = router;