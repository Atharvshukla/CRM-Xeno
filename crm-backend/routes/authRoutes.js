const express = require('express');
const { register, login } = require('../controllers/authController'); // Company register and login
const { customerLogin } = require('../controllers/customerAuthController'); // Customer login controller
const router = express.Router();

// Company routes
router.post('/register', register);
router.post('/login', login);

// Customer route
router.post('/customer/login', customerLogin);

module.exports = router;
