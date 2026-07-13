const express = require('express');
const router = express.Router();
const Host = require('../models/Host');

router.get('/', async (req, res) => {
  try {
    const hosts = await Host.find();
    res.json(hosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const host = await Host.findById(req.params.id);
    if (!host) return res.status(404).json({ error: 'Host not found' });
    res.json(host);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const host = new Host(req.body);
    await host.save();
    res.status(201).json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const host = await Host.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!host) return res.status(404).json({ error: 'Host not found' });
    res.json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const host = await Host.findByIdAndDelete(req.params.id);
    if (!host) return res.status(404).json({ error: 'Host not found' });
    res.json({ message: 'Host deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
