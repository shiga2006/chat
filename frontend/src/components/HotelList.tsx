import { useContext } from 'react';
import { BookingContext } from '../contexts/BookingContext';
import { Hotel } from '../types/types';

export default function HotelList() {
  const { state, dispatch } = useContext(BookingContext);
  const hotels: Hotel[] = []; // This would come from API in real app

  const selectHotel = (hotel: Hotel) => {
    dispatch({ type: 'SELECT_HOTEL', payload: hotel });
    dispatch({ type: 'ADD_MESSAGE', payload: { text: `Selected ${hotel.name} for $${hotel.price}/night`, isUser: false } });
    dispatch({ type: 'NEXT_STEP', payload: 'payment' });
  };

  return (
    <div className="space-y-4 mt-4">
      {hotels.length === 0 && (
        <p className="text-gray-500">No hotels found. Try another location.</p>
      )}
      {hotels.map((hotel) => (
        <div 
          key={hotel.id} 
          className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => selectHotel(hotel)}
        >
          <h3 className="font-bold">{hotel.name}</h3>
          <p className="text-gray-600">${hotel.price}/night</p>
          <p className="text-sm text-gray-500">{hotel.location}</p>
        </div>
      ))}
    </div>
  );
}