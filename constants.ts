// Luxury easing curve for premium feel (The "AMBER" style)
export const CUSTOM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SLOT_ITEMS = [
  { id: 1, text: "Romantic Dinner Date", icon: "🍽️" },
  { id: 2, text: "Handwritten Love Letter", icon: "📝" },
  { id: 3, text: "Unlimited Cuddles", icon: "🫂" },
  { id: 4, text: "Breakfast in Bed", icon: "🥞" },
  { id: 5, text: "Full Body Massage", icon: "💆‍♀️" },
  { id: 6, text: "Active Listening Session", icon: "👂" },
  { id: 7, text: "Star Gazing Trip", icon: "✨" },
];

// Generate static star positions to avoid hydration mismatches
export const STARS = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  top: Math.floor(Math.random() * 100),
  left: Math.floor(Math.random() * 100),
  delay: Math.random() * 2,
  text: [
    "You're my best friend.",
    "I'm lucky to have you.",
    "I'm so sorry.",
    "You are beautiful.",
    "I miss your laugh.",
    "You make life better.",
    "I love you endlessly.",
    "Forgive me?",
    "You are my sunshine.",
    "I promise to do better.",
    "Your smile is magic.",
    "You are my rock.",
    "My heart belongs to you.",
    "Thinking of you.",
    "I messed up, I know.",
    "Let me make it right.",
    "You deserve the world.",
    "I value you.",
    "You're amazing.",
    "Forever & Always."
  ][i % 20]
}));

export const PROMISES = [
  { id: 1, text: "Always be honest, even when it's hard." },
  { id: 2, text: "Plan more surprise dates." },
  { id: 3, text: "Listen to understand, not just to reply." },
  { id: 4, text: "Never break your trust again." },
  { id: 5, text: "Make you coffee every morning." },
  { id: 6, text: "Be the partner you deserve." },
  { id: 7, text: "Patience, always." },
  { id: 8, text: "Love you 1000% more every day." }
];

export const REASONS = [
  {
    id: 1,
    title: "I wasn't listening",
    content: "I was too focused on my own point of view and missed what you were really trying to tell me. I should have validated your feelings instead of being defensive.",
    icon: "👂"
  },
  {
    id: 2,
    title: "I was selfish",
    content: "I prioritized my immediate wants over our long-term happiness and your comfort. That was unfair and immature of me.",
    icon: "🛑"
  },
  {
    id: 3,
    title: "I broke a promise",
    content: "Trust is built in drops and lost in buckets. I know I spilled a bucket, and I am committed to refilling it, drop by drop.",
    icon: "🤝"
  },
  {
    id: 4,
    title: "I took you for granted",
    content: "I forgot to appreciate the little things you do every day. You are a gift, and I need to treat you like one.",
    icon: "💎"
  }
];

export const MEMORIES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=600",
    caption: "That time we laughed until it hurt.",
    rotation: -3
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=600",
    caption: "Best day ever.",
    rotation: 2
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=600",
    caption: "Just us being us.",
    rotation: -5
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?auto=format&fit=crop&q=80&w=600",
    caption: "Peaceful moments.",
    rotation: 4
  }
];

export const COMPLIMENTS = [
  "You are my favorite person.",
  "Your smile solves everything.",
  "I admire your kindness.",
  "You are incredibly smart.",
  "Thank you for being you.",
  "You make the world better.",
  "I love your laugh.",
  "You are beautiful inside and out.",
  "My heart is safe with you.",
  "You are my home."
];