const { loginUser, generateToken } = require('../services/AuthService');

const router = require('express').Router();

router.post(`/login`, async (req, res) => {
    await loginUser(req.body, res);
});
router.post('/token', async (req, res) => {
    await generateToken(req.body, res);
});
module.exports = router;