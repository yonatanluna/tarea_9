import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', { name, password });
      setToken(res.data.token);
      setMessage('Login exitoso');
    } catch {
      setMessage('Login fallido');
    }
  };

  const getData = async (role) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Acceso denegado');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <input className="border p-2 w-full mb-2" placeholder="Usuario" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 w-full mb-2" onClick={login}>Ingresar</button>
      <button className="bg-green-500 text-white p-2 w-full mb-2" onClick={() => getData('user')}>Ruta Usuario</button>
      <button className="bg-red-500 text-white p-2 w-full mb-2" onClick={() => getData('admin')}>Ruta Admin</button>
      <div className="mt-4 text-lg">{message}</div>
    </div>
  );
}

export default App;