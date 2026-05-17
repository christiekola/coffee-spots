import CoffeeMap from '../components/CoffeeMap';
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <main style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 34, fontWeight: 700, color: '#2a2a2a', marginBottom: 6 }}>
          ☕ my favourite toronto coffee spots
        </h1>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: '#6a6a6a', lineHeight: 1.5, maxWidth: 560 }}>
          from authentic matcha lattes and flaky croissants to cozy corners perfect for a rainy afternoon, these are the 25 spots i keep coming back to.
        </p>
      </div>

      {/* Map */}
      <CoffeeMap />

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #e0dbd0', margin: '32px 0' }} />

      {/* Chatbot */}
      <Chatbot />

    </main>
  );
}
