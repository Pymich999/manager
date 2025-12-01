const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

// Get all clients
router.get('/', protect, async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single client
router.get('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id, user: req.user._id });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create client
router.post('/', protect, async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Client name is required' });
    }

    const client = await Client.create({
      name,
      email,
      phone,
      company,
      user: req.user._id,
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update client
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const client = await Client.findOne({ _id: req.params.id, user: req.user._id });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.company = company || client.company;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete client
router.delete('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id, user: req.user._id });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await Client.deleteOne({ _id: req.params.id });

    // Also delete related notes
    await Note.deleteMany({ client: req.params.id });

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get client notes
router.get('/:id/notes', protect, async (req, res) => {
  try {
    const notes = await Note.find({
      client: req.params.id,
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
