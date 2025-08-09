import { useState, useContext } from 'react';
import { BookingContext } from '../contexts/BookingContext';
import useApi from '../hooks/useApi';

export default function PaymentForm() {
  const { state, dispatch } = useContext(BookingContext);
  const { processPayment } = useApi();
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await processPayment(cardDetails);
    if (success) {
      dispatch({ type: 'NEXT_STEP', payload: 'confirmation' });
      dispatch({ type: 'ADD_MESSAGE', payload: { text: "Payment successful! Your booking is confirmed.", isUser: false } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          value={cardDetails.number}
          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
          className="mt-1 block w-full border rounded-md p-2"
          placeholder="1234 5678 9012 3456"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry</label>
          <input
            type="text"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
            className="mt-1 block w-full border rounded-md p-2"
            placeholder="123"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={state.paymentStatus === 'processing'}
        className="w-full bg-blue-500 text-white py-2 rounded-md disabled:bg-blue-300"
      >
        {state.paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}