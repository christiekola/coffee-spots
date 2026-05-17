'use client';
import { useState, useRef, useEffect } from 'react';

const CHIPS = [
  "best matcha spot?",
  "I need somewhere with outlets to work",
  "somewhere cozy and quiet",
  "I'm near College Street",
  "best spot for a weekend afternoon",
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "hey! tell me where you're headed in toronto or what kind of vibe you're looking for, and i'll find the perfect coffee spot for you based off of Christie's recommendations! ✨" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  async function send(text) {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    const newHistory = [...history, { role: 'user', content: userMsg }];
    setHistory(newHistory);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await res.json();
      setHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'oops, something went wrong! try again in a sec.' }]);
    }
    setLoading(false);
  }

  return (
    <div>
      <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>✮ not sure where to go?</p>
      <p style={{ fontSize: 15, color: '#6a6a6a', marginBottom: 12 }}>tell me where you're headed, what you're craving, or what the occasion is.</p>

      <div style={{ border: '1.5px solid #d8cfc0', borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
        <div style={{ height: 300, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: m.role === 'bot' ? '#f0ede6' : '#5a7a4a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0, marginTop: 2 }}>
                {m.role === 'bot' ? '☕' : '✦'}
              </div>
              <div style={{ maxWidth: '78%', fontSize: 14, fontFamily: 'system-ui, sans-serif', lineHeight: 1.55, padding: '10px 14px', borderRadius: 12, borderBottomLeftRadius: m.role === 'bot' ? 4 : 12, borderBottomRightRadius: m.role === 'user' ? 4 : 12, background: m.role === 'bot' ? '#f5f2eb' : '#5a7a4a', color: m.role === 'bot' ? '#2a2a2a' : '#f0f5ec' }}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>☕</div>
              <div style={{ background: '#f5f2eb', padding: '12px 16px', borderRadius: 12, borderBottomLeftRadius: 4, display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a0a0a0', display: 'inline-block', animation: `bounce 1.2s ${d}s infinite` }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 12px 10px' }}>
          {CHIPS.map(c => (
            <button key={c} onClick={() => send(c)} disabled={loading}
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: 12, padding: '4px 10px', borderRadius: 20, border: '1px solid #d0c8b8', background: '#faf7f2', color: '#6a6a6a', cursor: loading ? 'default' : 'pointer' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderTop: '1px solid #ece8e0' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="e.g. i'm near bloor and need somewhere quiet to work..."
            disabled={loading}
            style={{ flex: 1, fontFamily: 'system-ui, sans-serif', fontSize: 14, padding: '8px 12px', borderRadius: 8, border: '1px solid #d0c8b8', background: '#faf7f2', color: '#2a2a2a', outline: 'none' }}/>
          <button onClick={() => send(input)} disabled={loading || !input.trim()}
            style={{ fontFamily: "'Caveat', cursive", fontSize: 15, padding: '0 18px', borderRadius: 8, border: '1.5px solid #5a7a4a', background: '#5a7a4a', color: '#f0f5ec', cursor: loading || !input.trim() ? 'default' : 'pointer', opacity: loading || !input.trim() ? 0.45 : 1 }}>
            send
          </button>
        </div>
      </div>
    </div>
  );
}
