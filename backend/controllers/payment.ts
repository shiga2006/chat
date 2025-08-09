import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { bookingId, paymentMethod } = req.body;
    
    // In a real app, integrate with Stripe/PayPal here
    // This is a mock implementation
    await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' });
    
    res.json({ success: true, message: 'Payment processed successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Payment failed' });
  }
};