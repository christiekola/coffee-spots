'use client';
import { useState } from 'react';

const spots = [
  { name:"Rooms (Baldwin)", hood:"Baldwin Village / Chinatown", addr:"17 Baldwin St", x:196, y:214, cat:"Baldwin" },
  { name:"Bloom", hood:"Downtown / Yonge", addr:"596 Yonge St", x:427, y:135, cat:"Downtown" },
  { name:"Found Coffee", hood:"Little Italy / College", addr:"324 College St", x:148, y:192, cat:"College" },
  { name:"Black Wolf Coffee", hood:"Downtown Toronto", addr:"Near Bay & Gerrard", x:310, y:165, cat:"Downtown" },
  { name:"Cafe Belem", hood:"Little Italy / College", addr:"546 College St", x:100, y:192, cat:"College" },
  { name:"Cafe23", hood:"Queen West", addr:"Near Lansdowne & Queen", x:50, y:295, cat:"Downtown" },
  { name:"Wu Wei Coffee", hood:"Kensington Market", addr:"44 Kensington Ave", x:138, y:228, cat:"College" },
  { name:"Butter & Blue", hood:"Baldwin Village", addr:"7 Baldwin St", x:208, y:226, cat:"Baldwin" },
  { name:"Tangssant Viennoiserie", hood:"Downtown Toronto", addr:"Near Bay & Grosvenor", x:330, y:148, cat:"Downtown" },
  { name:"The Brick Room", hood:"Financial District", addr:"9 Temperance St", x:330, y:340, cat:"Financial" },
  { name:"Coffee Island", hood:"Bay Street Corridor", addr:"925 Bay St", x:283, y:122, cat:"Downtown" },
  { name:"Nabulu Coffee", hood:"Church-Wellesley", addr:"Near Yonge & Wellesley", x:438, y:138, cat:"Downtown" },
  { name:"Neo Coffee Bar", hood:"Bay Street Corridor", addr:"770 Bay St Unit 3", x:272, y:140, cat:"Downtown" },
  { name:"Asset Coffee", hood:"Yorkville", addr:"24 Bellair St", x:372, y:82, cat:"Yorkville" },
  { name:"Matcha Matcha", hood:"Downtown / Chinatown", addr:"294 Dundas St W", x:175, y:240, cat:"Baldwin" },
  { name:"Dessert Lady Cafe", hood:"Yorkville / Bloor", addr:"1 Sultan St", x:400, y:90, cat:"Yorkville" },
  { name:"Project Seoul", hood:"Chinatown / Spadina", addr:"355 Spadina Ave", x:110, y:238, cat:"College" },
  { name:"Forget Me Not Coffee", hood:"King West", addr:"506 Adelaide St W", x:166, y:373, cat:"Financial" },
  { name:"Archi Element", hood:"Toronto West", addr:"West end (Roncesvalles area)", x:20, y:252, cat:"Downtown" },
  { name:"LA LA Bakeshop (Bay)", hood:"Financial District", addr:"276 Bay St", x:295, y:348, cat:"Financial" },
  { name:"Caphelia Coffee", hood:"Downtown Toronto", addr:"Near Church & Bloor", x:464, y:90, cat:"Downtown" },
  { name:"L'Espresso Bar Mercurio", hood:"The Annex", addr:"321 Bloor St W", x:186, y:88, cat:"Annex" },
  { name:"Cong Caphe (Annex)", hood:"The Annex", addr:"424 Bloor St W", x:146, y:88, cat:"Annex" },
  { name:"10 Dean (Spadina)", hood:"Near U of T", addr:"10 Dean St", x:248, y:200, cat:"Downtown" },
  { name:"10 Dean (Downtown East)", hood:"Downtown East", addr:"Between The Elm-Ledbury & 21 Dalhousie St", x:538, y:318, cat:"Financial" },
];

const FILTERS = ['all spots', 'the annex', 'baldwin', 'college st', 'downtown', 'yorkville', 'financial'];
const FILTER_KEYS = ['all', 'Annex', 'Baldwin', 'College', 'Downtown', 'Yorkville', 'Financial'];
const PIN = '#6a9a54';
const PIN_S = '#3a5a2a';

function mapsUrl(s) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ' ' + s.addr + ' Toronto')}`;
}

export default function CoffeeMap() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [vb, setVb] = useState({ x: 0, y: 0, w: 680, h: 440 });
  const [drag, setDrag] = useState(null);

  function clamp(v) {
    v.x = Math.max(0, Math.min(680 - v.w, v.x));
    v.y = Math.max(0, Math.min(440 - v.h, v.y));
    return v;
  }

  function onWheel(e) {
    e.preventDefault();
    const sc = e.deltaY > 0 ? 1.1 : 0.91;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width * vb.w + vb.x;
    const my = (e.clientY - rect.top) / rect.height * vb.h + vb.y;
    const nw = Math.min(680, Math.max(180, vb.w * sc));
    const nh = Math.min(440, Math.max(120, vb.h * sc));
    setVb(clamp({ x: mx - (e.clientX - rect.left) / rect.width * nw, y: my - (e.clientY - rect.top) / rect.height * nh, w: nw, h: nh }));
  }

  function onMouseDown(e) { setDrag({ sx: e.clientX, sy: e.clientY, vx: vb.x, vy: vb.y }); }
  function onMouseMove(e) {
    if (!drag) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setVb(v => clamp({ ...v, x: drag.vx - (e.clientX - drag.sx) / rect.width * vb.w, y: drag.vy - (e.clientY - drag.sy) / rect.height * vb.h }));
  }
  function onMouseUp() { setDrag(null); }

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {FILTERS.map((f, i) => (
          <button key={f} onClick={() => { setFilter(FILTER_KEYS[i]); setActive(null); }}
            style={{ fontFamily: "'Caveat', cursive", fontSize: 13, padding: '2px 11px', borderRadius: 20, border: '1.5px solid #5a7a4a', background: filter === FILTER_KEYS[i] ? '#5a7a4a' : 'transparent', color: filter === FILTER_KEYS[i] ? '#f0f5ec' : '#3a5a2a', cursor: 'pointer', transition: 'all 0.15s' }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', width: '100%', height: 440, border: '2px solid #5a7a4a', borderRadius: 4, overflow: 'hidden', background: '#f5f0e8' }}>
        <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: drag ? 'grabbing' : 'grab' }}
          onWheel={onWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
          <defs>
            <filter id="sk"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/></filter>
          </defs>
          {/* Streets */}
          {[88,55,135,192,240,295,348,375].map((y,i) => <path key={i} d={`M10 ${y} Q300 ${y-3} 670 ${y}`} stroke="#c8b898" strokeWidth={[6,3,3.5,5,4,5,4,3][i]} fill="none" filter="url(#sk)" opacity={[.75,.4,.5,.7,.6,.7,.6,.45][i]}/>)}
          {[55,110,175,245,295,380,420,460,505,545].map((x,i) => <path key={i} d={`M${x} 10 Q${x-2} 220 ${x} 440`} stroke="#c8b898" strokeWidth={[3.5,5,3.5,3.5,4,2.5,5.5,3,3,2.5][i]} fill="none" filter="url(#sk)" opacity={[.5,.7,.5,.5,.62,.38,.72,.42,.42,.35][i]}/>)}
          {/* Labels */}
          <text x="668" y="91" fontFamily="Caveat" fontSize="10" fill="#a89070" textAnchor="end">Bloor St W</text>
          <text x="668" y="196" fontFamily="Caveat" fontSize="10" fill="#a89070" textAnchor="end">College St</text>
          <text x="668" y="244" fontFamily="Caveat" fontSize="10" fill="#a89070" textAnchor="end">Dundas St W</text>
          <text x="668" y="299" fontFamily="Caveat" fontSize="10" fill="#a89070" textAnchor="end">Queen St W</text>
          <text x="668" y="352" fontFamily="Caveat" fontSize="10" fill="#a89070" textAnchor="end">King St W</text>
          <text x="668" y="378" fontFamily="Caveat" fontSize="10" fill="#a89070" textAnchor="end">Adelaide St W</text>
          <text x="112" y="12" fontFamily="Caveat" fontSize="10" fill="#a89070">Spadina</text>
          <text x="297" y="12" fontFamily="Caveat" fontSize="10" fill="#a89070">Bay St</text>
          <text x="422" y="12" fontFamily="Caveat" fontSize="10" fill="#a89070">Yonge St</text>
          <text x="57" y="12" fontFamily="Caveat" fontSize="10" fill="#a89070">Bathurst</text>
          <text x="547" y="12" fontFamily="Caveat" fontSize="10" fill="#a89070">Dalhousie</text>
          {/* Zones */}
          <rect x="168" y="92" width="122" height="108" rx="4" fill="#4a7c59" opacity="0.12" stroke="#4a7c59" strokeWidth="1.5" strokeDasharray="5,3"/>
          <text x="229" y="110" fontFamily="Caveat" fontSize="12" fill="#2d5c3a" textAnchor="middle" fontWeight="700">U of T</text>
          <text x="229" y="124" fontFamily="Caveat" fontSize="10" fill="#2d5c3a" textAnchor="middle" fontStyle="italic">St George</text>
          <rect x="10" y="58" width="148" height="58" fill="#e8d5b0" opacity="0.16" rx="2"/>
          <text x="16" y="70" fontFamily="Caveat" fontSize="10" fill="#b89a60" fontStyle="italic">The Annex</text>
          <rect x="55" y="182" width="100" height="52" fill="#d0e8c0" opacity="0.16" rx="2"/>
          <text x="60" y="194" fontFamily="Caveat" fontSize="10" fill="#5a8040" fontStyle="italic">Kensington</text>
          <rect x="295" y="315" width="195" height="75" fill="#d0e0f8" opacity="0.14" rx="2"/>
          <text x="302" y="328" fontFamily="Caveat" fontSize="10" fill="#4060a0" fontStyle="italic">Financial District</text>
          <rect x="505" y="270" width="160" height="100" fill="#f0d8e0" opacity="0.14" rx="2"/>
          <text x="512" y="283" fontFamily="Caveat" fontSize="10" fill="#905060" fontStyle="italic">Downtown East</text>
          {/* Pins */}
          {spots.map((s, i) => {
            const visible = filter === 'all' || s.cat === filter;
            return (
              <g key={i} transform={`translate(${s.x},${s.y})`} style={{ cursor: visible ? 'pointer' : 'default', opacity: visible ? 1 : 0.08, transition: 'opacity 0.3s' }}
                onMouseEnter={() => setTooltip(s)} onMouseLeave={() => setTooltip(null)}
                onClick={() => visible && setActive(active?.name === s.name ? null : s)}>
                <ellipse cx="0" cy="0" rx="4" ry="2" fill={PIN_S} opacity="0.22"/>
                <line x1="0" y1="-5" x2="0" y2="0" stroke={PIN_S} strokeWidth="1.4"/>
                <circle cx="0" cy="-14" r="9" fill={PIN} stroke={PIN_S} strokeWidth="1.2"/>
                <text x="0" y="-10" fontFamily="Caveat" fontSize="10" fill="#f0f5ec" textAnchor="middle">☕</text>
              </g>
            );
          })}
          {/* Tooltip */}
          {tooltip && (() => {
            const bw = Math.min(tooltip.name.length * 7.5 + 20, 210);
            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect x={tooltip.x - bw/2} y={tooltip.y - 42} width={bw} height={20} rx="3" fill="#2a3a1a" opacity="0.88"/>
                <text x={tooltip.x} y={tooltip.y - 28} fontFamily="Caveat" fontSize="13" fill="#e8f0e0" textAnchor="middle">{tooltip.name}</text>
              </g>
            );
          })()}
          {/* Compass */}
          <g transform="translate(645,420)">
            <circle cx="0" cy="0" r="15" fill="rgba(240,245,236,0.92)" stroke="#5a7a4a" strokeWidth="1.5" filter="url(#sk)"/>
            <text x="0" y="5" fontFamily="Caveat" fontSize="15" fill="#5a7a4a" textAnchor="middle" fontWeight="700">N</text>
          </g>
        </svg>

        {/* Info panel */}
        {active && (
          <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(245,242,236,0.97)', border: '1.5px solid #5a7a4a', borderRadius: 4, padding: '10px 14px', fontFamily: "'Caveat', cursive", maxWidth: 220, minWidth: 175, color: '#2a3a1a', zIndex: 20 }}>
            <span onClick={() => setActive(null)} style={{ float: 'right', cursor: 'pointer', fontSize: 17, color: '#5a7a4a' }}>✕</span>
            <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2, marginBottom: 2 }}>{active.name}</div>
            <div style={{ fontSize: 12, color: '#5a7a4a', marginBottom: 3 }}>{active.hood}</div>
            <div style={{ fontSize: 12, color: '#4a5a3a', lineHeight: 1.4, marginBottom: 6 }}>{active.addr}</div>
            <a href={mapsUrl(active)} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#3a6a2a', textDecoration: 'none' }}>open in google maps ↗</a>
          </div>
        )}
      </div>
    </div>
  );
}
