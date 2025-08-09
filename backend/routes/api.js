const { Router } = require('express');
const { getHotels } = require('../controllers/hotel');
const { createBooking } = require('../controllers/booking');
const { processPayment } = require('../controllers/payment');
const { generateChatResponse } = require('../services/openai');

const router = Router();

module.exports = router;

// Hotel routes
router.get('/hotels', getHotels);

// Booking routes
router.post('/booking', createBooking);

// Payment routes
router.post('/payment', processPayment);

// Chat route
router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await generateChatResponse(message);
  res.json({ reply: response });
});

export default router;