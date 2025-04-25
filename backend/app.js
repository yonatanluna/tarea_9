require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Juan', password: bcrypt.hashSync('1234', 8), role: 'admin' },
  { id: 2, name: 'Ana', password: bcrypt.hashSync('abcd', 8), role: 'user' }
];

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = users.find(u => u.name === name);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

app.use('/api', protectedRoutes);

app.listen(3000, () => console.log('Backend corriendo en http://localhost:3000'));
