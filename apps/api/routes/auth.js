const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Host = require('../models/Host');
const { auth } = require('../middleware/auth');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

router.post('/login', async (req, res) => {
  try {
    const { email, password, loginType } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    if (loginType === 'host') {
      const host = await Host.findOne({ email });
      if (!host) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });

      const isMatch = password === host.password;
      if (!isMatch) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });

      const token = generateToken({ id: host._id, name: host.name, type: 'host' });
      return res.json({
        token,
        user: { id: host._id, name: host.name, email: host.email, type: 'host', gender: host.gender, personality: host.personality }
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });

    const token = generateToken({ id: user._id, name: user.name, email: user.email, role: user.role, type: 'user' });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, type: 'user', bedtime: user.bedtime, waketime: user.waketime }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, bedtime, waketime } = req.body;

    if (!name || !email || !password || !bedtime || !waketime) {
      return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'อีเมลนี้ถูกใช้แล้ว' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, bedtime, waketime, role: 'user' });
    await user.save();

    const token = generateToken({ id: user._id, name: user.name, email: user.email, role: user.role, type: 'user' });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, type: 'user', bedtime: user.bedtime, waketime: user.waketime }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    if (req.user.type === 'host') {
      const host = await Host.findById(req.user.id).select('-password');
      if (!host) return res.status(404).json({ error: 'Host not found' });
      return res.json({ ...host.toObject(), type: 'host' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ ...user.toObject(), type: 'user' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
