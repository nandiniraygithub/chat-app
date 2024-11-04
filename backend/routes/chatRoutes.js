const express = require("express");
const Message = require("../models/Message");
const authMiddleware = require("../Middlewares/Auth");
const router = express.Router();

router.post("/message", authMiddleware, async (req, res) => {
  const { content } = req.body;
  const message = new Message({ content, sender: req.user.id });
  await message.save();
  res.status(201).json(message);
});

router.get("/messages", authMiddleware, async (req, res) => {
  const messages = await Message.find().populate("sender", "username");
  res.json(messages);
});

module.exports = router;
