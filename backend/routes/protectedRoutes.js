const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roles');

router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: `Hola Admin ${req.user.name}` });
});

router.get('/user', authenticateToken, authorizeRoles('user', 'admin'), (req, res) => {
  res.json({ message: `Hola Usuario ${req.user.name}` });
});

module.exports = router;