const express = require('express');
const router = express.Router();
const Users = require('../models/user.js');

// Get das informações
router.get('/', async (req, res) => {
  try {
    const users = await Users.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get com o parametro id
router.get('/:id', getUsers, (req, res) => {
  res.json(res.user);
});

// Post para o banco de dados
router.post('/', async (req, res) => {
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    isActive: req.body.isActive
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Alteração de dados
router.patch('/:id', getUsers, async (req, res) => {
  if(req.body.name != null) {
    res.user.name = req.body.name;
  }
  if(req.body.email != null) {
    res.user.email = req.body.email;
  }
  if(req.body.password != null) {
    res.user.password = req.body.password;
  }
  if(req.body.isAdmin != null) {
    res.user.isAdmin = req.body.isAdmin;
  }
  if(req.body.isActive != null) {
    res.user.isActive = req.body.isActive;
  }
  try {
    const upadeteUser = await res.user.save();
    res.json(upadeteUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar dados
router.delete('/:id', getUsers, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para pegar o id
async function getUsers(req, res, next) {
  try {
    user = await Users.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next()
}
module.exports = router;