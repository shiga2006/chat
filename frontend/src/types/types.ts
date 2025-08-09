export interface Hotel {
  id: string;
  name: string;
  price: number;
  location: string;
  image: string;
  amenities: string[];
}

export interface BookingState {
  step: 'welcome' | 'date_selection' | 'hotel_selection' | 'payment' | 'confirmation';
  messages: Array<{ text: string; isUser: boolean }>;
  selectedHotel: Hotel | null;
  checkIn: string | null;
  checkOut: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
}