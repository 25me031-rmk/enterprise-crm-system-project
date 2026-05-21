const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  if (email && password) {

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });

  } else {

    res.status(400).json({
      message: 'Invalid credentials'
    });

  }

});

module.exports = router;