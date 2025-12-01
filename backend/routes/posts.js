const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Get all posts with optional filters
router.get('/', protect, async (req, res) => {
  try {
    const { client, platform, startDate, endDate } = req.query;

    const filter = { user: req.user._id };

    if (client) filter.client = client;
    if (platform) filter.platform = platform;
    if (startDate || endDate) {
      filter.targetDate = {};
      if (startDate) filter.targetDate.$gte = new Date(startDate);
      if (endDate) filter.targetDate.$lte = new Date(endDate);
    }

    const posts = await Post.find(filter)
      .populate('client', 'name company')
      .sort({ targetDate: 1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post
router.get('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user._id })
      .populate('client', 'name company email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get posts grouped by date (for calendar view)
router.get('/calendar/view', protect, async (req, res) => {
  try {
    const { month, year } = req.query;

    let filter = { user: req.user._id };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      filter.targetDate = { $gte: startDate, $lte: endDate };
    }

    const posts = await Post.find(filter)
      .populate('client', 'name company')
      .sort({ targetDate: 1 });

    // Group by date
    const groupedPosts = posts.reduce((acc, post) => {
      const date = post.targetDate.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(post);
      return acc;
    }, {});

    res.json(groupedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post
router.post('/', protect, async (req, res) => {
  try {
    const { client, caption, mediaUrl, targetDate, platform, status } = req.body;

    if (!client || !caption || !targetDate || !platform) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const post = await Post.create({
      client,
      caption,
      mediaUrl,
      targetDate,
      platform,
      status: status || 'planned',
      user: req.user._id,
    });

    const populatedPost = await Post.findById(post._id).populate('client', 'name company');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload media
router.post('/upload', protect, upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update post
router.put('/:id', protect, async (req, res) => {
  try {
    const { client, caption, mediaUrl, targetDate, platform, status } = req.body;

    const post = await Post.findOne({ _id: req.params.id, user: req.user._id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.client = client || post.client;
    post.caption = caption || post.caption;
    post.mediaUrl = mediaUrl !== undefined ? mediaUrl : post.mediaUrl;
    post.targetDate = targetDate || post.targetDate;
    post.platform = platform || post.platform;
    post.status = status || post.status;

    const updatedPost = await post.save();
    const populatedPost = await Post.findById(updatedPost._id).populate('client', 'name company');

    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user._id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.deleteOne({ _id: req.params.id });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
