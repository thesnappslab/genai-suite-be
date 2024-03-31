const { loginUser } = require('../services/AuthService');

const router = require('express').Router();

router.post(`/login`, async (req, res) => {
    await loginUser(req.body, res);
});