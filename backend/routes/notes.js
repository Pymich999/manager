const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

// Get all notes
router.get('/', protect, async (req, res) => {
  try {
    const { client } = req.query;
    const filter = { user: req.user._id };

    if (client) filter.client = client;

    const notes = await Note.find(filter)
      .populate('client', 'name company')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single note
router.get('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
      .populate('client', 'name company');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create note
router.post('/', protect, async (req, res) => {
  try {
    const { client, title, content } = req.body;

    if (!client || !title || !content) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const note = await Note.create({
      client,
      title,
      content,
      user: req.user._id,
    });

    const populatedNote = await Note.findById(note._id).populate('client', 'name company');

    res.status(201).json(populatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update note
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();
    const populatedNote = await Note.findById(updatedNote._id).populate('client', 'name company');

    res.json(populatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete note
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await Note.deleteOne({ _id: req.params.id });

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
