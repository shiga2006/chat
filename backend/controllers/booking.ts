import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { hotelId, checkIn, checkOut } = req.body;
    const booking = new Booking({
      hotel: hotelId,
      user: req.user?.id, // Assuming you have auth middleware
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut)
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking' });
  }
};