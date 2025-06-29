import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Save fund
router.post('/save', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.savedFunds.includes(req.body.fundId)) {
      user.savedFunds.push(req.body.fundId);
      await user.save();
    }
    res.json({ savedFunds: user.savedFunds });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get saved funds
router.get('/saved', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ savedFunds: user.savedFunds });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Bonus: Remove saved fund
router.post('/remove', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedFunds = user.savedFunds.filter(id => id !== req.body.fundId);
    await user.save();
    res.json({ savedFunds: user.savedFunds });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
