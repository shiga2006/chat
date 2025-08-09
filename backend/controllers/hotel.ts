import { Request, Response } from 'express';
import Hotel from '../models/Hotel';

export const getHotels = async (req: Request, res: Response) => {
  try {
    const { location } = req.query;
    const hotels = await Hotel.find({ location });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
};