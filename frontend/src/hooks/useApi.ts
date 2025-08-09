import axios from 'axios';
import { useContext } from 'react';
import { BookingContext } from '../contexts/BookingContext';

export default function useApi() {
  const { dispatch } = useContext(BookingContext);

  const fetchHotels = async (location: string) => {
    try {
      const res = await axios.get('/api/hotels', { params: { location } });
      dispatch({ type: 'ADD_MESSAGE', payload: { text: `Found ${res.data.length} hotels in ${location}`, isUser: false } });
      return res.data;
    } catch (error) {
      dispatch({ type: 'ADD_MESSAGE', payload: { text: "Failed to fetch hotels. Please try again.", isUser: false } });
      return [];
    }
  };

  const processPayment = async (cardDetails: any) => {
    dispatch({ type: 'SET_PAYMENT_STATUS', payload: 'processing' });
    try {
      await axios.post('/api/payment', cardDetails);
      dispatch({ type: 'SET_PAYMENT_STATUS', payload: 'success' });
      return true;
    } catch (error) {
      dispatch({ type: 'SET_PAYMENT_STATUS', payload: 'failed' });
      return false;
    }
  };

  return { fetchHotels, processPayment };
}