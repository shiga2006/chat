import { BookingProvider } from './contexts/BookingContext';
import Chatbot from './components/Chatbot';
import './index.css';

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50">
        <Chatbot />
      </div>
    </BookingProvider>
  );
}

export default App;