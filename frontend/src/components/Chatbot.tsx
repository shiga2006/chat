import { useState, useContext, useEffect } from 'react';
import { BookingContext } from '../contexts/BookingContext';
import HotelList from './HotelList';
import PaymentForm from './PaymentForm';
import useApi from '../hooks/useApi';

export default function Chatbot() {
  const { state, dispatch } = useContext(BookingContext);
  const { fetchHotels } = useApi();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    dispatch({ type: 'ADD_MESSAGE', payload: { text: input, isUser: true } });
    
    // Simple bot logic
    if (state.step === 'welcome') {
      setTimeout(() => {
        dispatch({ type: 'ADD_MESSAGE', payload: { text: "Great! When would you like to check in?", isUser: false } });
        dispatch({ type: 'NEXT_STEP', payload: 'date_selection' });
      }, 500);
    }
    
    setInput('');
  };

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {state.messages.map((msg, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-lg max-w-[80%] ${msg.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'}`}
          >
            {msg.text}
          </div>
        ))}
        
        {state.step === 'hotel_selection' && <HotelList />}
        {state.step === 'payment' && <PaymentForm />}
      </div>
      
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
        />
        <button 
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}