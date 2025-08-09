import { Schema, model } from 'mongoose';

interface IHotel {
  name: string;
  location: string;
  price: number;
  amenities: string[];
  image: string;
}

const hotelSchema = new Schema<IHotel>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  image: { type: String }
});

export default model<IHotel>('Hotel', hotelSchema);