import { Schema, model } from 'mongoose';

interface IBooking {
  hotel: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const bookingSchema = new Schema<IBooking>({
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export default model<IBooking>('Booking', bookingSchema);