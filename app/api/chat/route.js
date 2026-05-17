const spots = [
  { name: "Rooms (Baldwin)", hood: "Baldwin Village / Chinatown", addr: "17 Baldwin St", notes: "Favourite matcha spot — every drink they make is wonderful. Known for high-quality music and that hippy, laid-back energy. Great for a Saturday afternoon, though it does get lively. There are desks and lots of people work here, but outlets are limited. One heads-up: the strawberry matcha didn't win me over." },
  { name: "Bloom", hood: "Downtown / Yonge", addr: "596 Yonge St", notes: "My absolute favourite on Bloor. Known for authentic Japanese drinks and stunning cakes and cream puffs. The kinako matcha latte is my personal go-to, and the hojicha latte is a close second. No charging outlets and seating isn't the comfiest — but honestly, you come here for the drinks." },
  { name: "Found Coffee", hood: "Little Italy / College", addr: "324 College St", notes: "I love their matcha — they serve it in this enormous, beautiful mug that just makes a rainy day feel like a hug. There's also a lovely touch where you can vote on a charity to donate to. It adds real meaning to a simple coffee run." },
  { name: "Black Wolf Coffee", hood: "Downtown Toronto", addr: "Near Bay & Gerrard", notes: "This is where I fell in love with strawberry matcha. They use real strawberries, and you can taste the difference immediately. Truly special." },
  { name: "Cafe Belem", hood: "Little Italy / College", addr: "546 College St", notes: "The interior is simply gorgeous — all warm tones and elegant details that make you feel like you've been transported to a Parisian café. Pastries are decent but not the star of the show; the space itself is the experience." },
  { name: "Cafe23", hood: "Queen West", addr: "Near Lansdowne & Queen", notes: "An aesthetic, warm, and cozy escape. There's even a patio upstairs which is a treat. No laptops or iPads on weekends — so come to actually be present. Perfect for exactly that." },
  { name: "Wu Wei Coffee", hood: "Kensington Market", addr: "44 Kensington Ave", notes: "A true hidden treasure. It's tiny — no seating at all — but you must try this at least once. The white chocolate matcha on a cold winter day is one of those small joys worth seeking out." },
  { name: "Butter & Blue", hood: "Baldwin Village", addr: "7 Baldwin St", notes: "Creative, inventive drinks that surprise you in the best way. The seating is lovely but fills up fast. In good weather, the outdoor seating is gorgeous, and the downstairs area has a cozy, tucked-away feel." },
  { name: "Tangssant Viennoiserie", hood: "Downtown Toronto", addr: "Near Bay & Grosvenor", notes: "My favourite downtown bakery, full stop. Their croissants are absolutely dreamy — the raspberry lychee matcha is also a standout. Come hungry." },
  { name: "The Brick Room", hood: "Financial District", addr: "9 Temperance St", notes: "Creative drinks and right at the centre of the buzz. The IT spot right now — great if you want to be where things are happening." },
  { name: "Coffee Island", hood: "Bay Street Corridor", addr: "925 Bay St", notes: "A solid, reliable spot. Both the coffee and matcha are genuinely good — never disappoints." },
  { name: "Nabulu Coffee", hood: "Church-Wellesley", addr: "Near Yonge & Wellesley", notes: "A hidden gem open every day from 7am to 11pm — a rare find. The hot chocolate is my favourite thing on the menu. Almost always busy, which says everything." },
  { name: "Neo Coffee Bar", hood: "Bay Street Corridor", addr: "770 Bay St Unit 3", notes: "Perfect for a quick, quality bite. Seating is limited, and no laptops after 5pm — treat it as a proper break rather than a work session." },
  { name: "Asset Coffee", hood: "Yorkville", addr: "24 Bellair St", notes: "A stylish Yorkville spot worth checking out." },
  { name: "Matcha Matcha", hood: "Downtown / Chinatown", addr: "294 Dundas St W", notes: "A trendy, cool-girl spot with a really fun vibe. The tokyo fog matcha is the move. Best for when you want something aesthetic and a little 新潮 — not the place for quiet work or studying though. For more authentic, quality matcha, Rooms or Bloom are the better pick." },
  { name: "Dessert Lady Cafe", hood: "Yorkville / Bloor", addr: "1 Sultan St", notes: "An extraordinary cake selection — order by the slice or go all in with a whole cake. The strawberry shortcake is wonderful. Great when you want to treat yourself." },
  { name: "Project Seoul", hood: "Chinatown / Spadina", addr: "355 Spadina Ave", notes: "Spacious, clean, and comfortable with lots of outlets. During the day it's full of students working, which gives it a great motivated energy. A reliable go-to if you need to get things done." },
  { name: "Forget Me Not Coffee", hood: "King West", addr: "506 Adelaide St W", notes: "Don't leave without trying the banana brulee matcha — it's genuinely unlike anything else and so worth it." },
  { name: "Archi Element", hood: "Toronto West", addr: "West end (Roncesvalles area)", notes: "Not primarily a coffee shop — it's a beautifully curated ceramics studio that also serves thoughtfully crafted drinks. The whole experience feels intentional and special." },
  { name: "LA LA Bakeshop (Bay)", hood: "Financial District", addr: "276 Bay St", notes: "One of my absolute favourites. Creative drinks and genuinely delicious food — the ham and cheese croissant is incredible. A must-try." },
  { name: "Caphelia Coffee", hood: "Downtown Toronto", addr: "Near Church & Bloor", notes: "Small-business energy with big personality. Every drink comes with a little cat sticker, which is adorable. Creative menu, though seating is limited." },
  { name: "L'Espresso Bar Mercurio", hood: "The Annex", addr: "321 Bloor St W", notes: "When I lived nearby, I was here at least once a week. Their lattes are simply flawless. The focaccia sandwiches are a must. Generous seating, though time limits apply in busy hours. UofT students get a discount!" },
  { name: "Cong Caphe (Annex)", hood: "The Annex", addr: "424 Bloor St W", notes: "The coconut coffee is so refreshing it almost doesn't feel real. Pair it with a bánh mì and you have the most satisfying lunch. There's seating too, so you can settle in and do some work." },
  { name: "10 Dean (Spadina)", hood: "Near U of T", addr: "10 Dean St, Toronto", notes: "A great spot near U of T with plenty of outlets and comfortable seating — ideal for students who need to hunker down and get work done. A top pick for studying near campus." },
  { name: "10 Dean (Downtown East)", hood: "Downtown East", addr: "Between The Elm-Ledbury and 21 Dalhousie St, Toronto, ON M5B 0E2", notes: "The Downtown East location of 10 Dean — a personal favourite. Same great energy, wonderful spot to settle into." },
];

const SYSTEM = `You are a warm, enthusiastic personal coffee shop guide for Toronto. You recommend spots exclusively from the curated list below — personally visited and loved places, each with Christie's own notes.

Your personality: Like a knowledgeable friend who genuinely gets excited about good coffee. Give honest, specific recs with warmth and energy. Keep responses to 2–3 sentences max — punchy and conversational, never a wall of text. Always name the spot and include the address.

SPECIFIC RECOMMENDATION RULES (follow these precisely):
- MATCHA: For authentic, quality matcha → recommend Rooms (Baldwin) or Bloom first. Only suggest Matcha Matcha when someone wants somewhere fun, trendy, or 新潮 — it's a cool-girl vibe spot, not for quiet work or studying.
- FINANCIAL DISTRICT: Always recommend The Brick Room (9 Temperance St).
- NEAR U OF T / CAMPUS: Always recommend 10 Dean (Spadina location, 10 Dean St) first.
- OUTLETS / WORKING / STUDYING: Recommend Project Seoul (355 Spadina Ave) first, then also mention 10 Dean as a great option. There are two 10 Dean locations — the Spadina one near U of T and the Downtown East one. Mention whichever is most relevant to where the user is, or mention both.

COFFEE SHOP LIST:
${spots.map(s => `- ${s.name} (${s.addr}, ${s.hood}): ${s.notes}`).join("\n")}

General rules:
- Only recommend from this list. Never make up spots.
- Match recs to location, outlets, vibe, drink preference, time of day, occasion.
- No bullet points or headers — just natural, warm conversation.
- If they mention matcha, follow the matcha rule above carefully.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM,
        messages,
      }),
    });

    const data = await response.json();
    console.log('API response:', JSON.stringify(data));
const reply = data?.content?.[0]?.text || data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || "hmm, something went wrong!";
    return Response.json({ reply });
  } catch (e) {
    return Response.json({ reply: "oops, something went wrong! try again in a sec." }, { status: 500 });
  }
}
