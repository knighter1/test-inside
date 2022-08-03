const express = require('express');

const router = express.Router();

router.post(`/login`, async (req, res) => {
    const { name, password } = req.query;
    console.log([name, password]);
});


module.exports = router;
