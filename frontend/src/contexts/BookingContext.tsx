import { createContext, useReducer, ReactNode } from 'react';
import { BookingState } from '../types/types';

const initialState: BookingState = {
  step: 'welcome',
  messages: [{ text: "Welcome to HotelBot! Where would you like to stay?", isUser: false }],
  selectedHotel: null,
  checkIn: null,
  checkOut: null,
  paymentStatus: 'idle'
};

export const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

function reducer(state: BookingState, action: any): BookingState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_DATES':
      return { ...state, checkIn: action.payload.checkIn, checkOut: action.payload.checkOut };
    case 'SELECT_HOTEL':
      return { ...state, selectedHotel: action.payload };
    case 'NEXT_STEP':
      return { ...state, step: action.payload };
    case 'SET_PAYMENT_STATUS':
      return { ...state, paymentStatus: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}