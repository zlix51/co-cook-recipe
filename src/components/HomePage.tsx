import { useState } from 'react';
import fridge1 from 'figma:asset/2931ddeac9da63dd52f4d6d6314405dc3a2f7740.png';
import fridge2 from 'figma:asset/0f9bb0c5090b398efef603eaf1f1835922742ecb.png';
import fridge3 from 'figma:asset/576f6c0dae4185ede10af3b5ec4632ba4cdc1c5b.png';
import fridge4 from 'figma:asset/2407cce450c301bf00480217624576f2af144aba.png';
import fridge5 from 'figma:asset/9a22746f512ad4326e3fe114d227429d44ba45d8.png';
import fridge6 from 'figma:asset/b1d7cbdee1ece5d9317a092a9d658da0fa897b48.png';
import fridge7 from 'figma:asset/ec9bb3fae4ebe59f643e8c886da35f2e2fe82c3d.png';
import fridge8 from 'figma:asset/929df5e84811b091f73fd9dd4c59d5d490325a64.png';
import fridge9 from 'figma:asset/7e638f3c01955de7c14844da41e39043f5a06d4d.png';
import fridge10 from 'figma:asset/179d8ad13ae0ed4369427bc5ed222ba4d4644f7a.png';
import fridge11 from 'figma:asset/167820b1736b86609b3955d9e412e0780d7a51ef.png';
import backgroundImage from 'figma:asset/2a53f6353554f5d46af61ee82cbff18907d2dfa7.png';
import { Menu, X } from 'lucide-react';

interface HomePageProps {
  onSelectFridge: (fridgeId: number) => void;
  onNavigateToCook?: () => void;
  onNavigateToQRCode?: () => void;
}

// Fridge card data
const fridgeData = [
  {
    id: 1,
    title: "Resident 1",
    forgottenItems: "pickled vegetables, sausage, yogurt",
    quote1: "I always think I'll eat it tomorrow, but tomorrow never comes.",
    quote2: "I don't throw it away because I feel bad… so it just stays there."
  },
  {
    id: 2,
    title: "Resident 2",
    forgottenItems: "carrots, apples, fruit juice",
    quote1: "Sometimes I buy too much because I want to be healthy — then I forget what I bought.",
    quote2: "If it's in the back of the fridge, I just don't see it anymore."
  },
  {
    id: 3,
    title: "Resident 3",
    forgottenItems: "leftover rice, bread, old yogurt",
    quote1: "I don't like throwing food away, so I keep it until it goes bad.",
    quote2: "Leftovers are tricky… I'm never sure if they're still safe."
  },
  {
    id: 4,
    title: "Resident 4",
    forgottenItems: "half watermelon, meat, eggs",
    quote1: "I plan to cook with my roommates, but our schedule never matches.",
    quote2: "Sometimes I forget what I bought because I hide things under other things."
  },
  {
    id: 5,
    title: "Resident 5",
    forgottenItems: "half bottle of milk, sauce bottles",
    quote1: "All of us have our own sauces — nobody wants to mix or share.",
    quote2: "Milk expires so fast… I always lose track of which one is mine."
  },
  {
    id: 6,
    title: "Resident 6",
    forgottenItems: "takeaway leftovers, vegetables, extra eggs",
    quote1: "Leftovers belong to someone, but also to no one.",
    quote2: "I keep buying eggs because I forget I already have some."
  },
  {
    id: 7,
    title: "Resident 7",
    forgottenItems: "tofu, juice boxes, eggs",
    quote1: "When things are on sale, I buy too much… and then I forget about them.",
    quote2: "I don't want to throw things out because I feel it's wasteful, so I avoid opening the fridge."
  },
  {
    id: 8,
    title: "Resident 8",
    forgottenItems: "leftover dishes, cabbage, meat",
    quote1: "Sometimes I don't open the fridge for days — it's easier not to see what's inside.",
    quote2: "I tell myself I'll cook the cabbage soon, but it always ends up soft."
  },
  {
    id: 9,
    title: "Resident 9",
    forgottenItems: "citrus fruits, bread, old salad",
    quote1: "We try to clean the fridge together, but no one wants to be the first to throw things away.",
    quote2: "Salad goes bad so quickly… I always forget it's there."
  },
  {
    id: 10,
    title: "Resident 10",
    forgottenItems: "mushrooms, potatoes, cabbage",
    quote1: "I want to cook something nice, but when I finally have time, the ingredients are already bad.",
    quote2: "I keep the potatoes for too long because they look 'fine'… until they don't."
  },
  {
    id: 11,
    title: "Resident 11",
    forgottenItems: "leftovers, potatoes, fruit",
    quote1: "I feel guilty when I see wasted food, but the habit is hard to change.",
    quote2: "Sometimes I forget fruit at the bottom drawer for weeks."
  },
];

export function HomePage({ onSelectFridge, onNavigateToCook, onNavigateToQRCode }: HomePageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const fridges = [fridge1, fridge2, fridge3, fridge4, fridge5, fridge6, fridge7, fridge8, fridge9, fridge10, fridge11];

  const toggleFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <div 
      className="w-screen h-screen overflow-y-auto relative"
      style={{ 
        fontFamily: "'Mundial Narrow Variable', sans-serif",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Circular Menu Button - Top Left Corner */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 left-6 z-50 w-16 h-16 rounded-full transition-colors flex items-center justify-center border-2"
        style={{
          backgroundColor: '#EF67A7',
          borderColor: '#EF67A7',
          opacity: 0.8
        }}
      >
        {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Menu Panel */}
      {menuOpen && (
        <div className="fixed top-28 left-6 z-40 bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              style={{ fontFamily: "'Swiss Grit', sans-serif" }}
            >
              Home
            </button>
            <button
              onClick={() => {
                if (onNavigateToCook) {
                  onNavigateToCook();
                }
                setMenuOpen(false);
              }}
              className="px-8 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              style={{ fontFamily: "'Swiss Grit', sans-serif" }}
            >
              Co-Cook
            </button>
            <button
              onClick={() => {
                if (onNavigateToQRCode) {
                  onNavigateToQRCode();
                }
                setMenuOpen(false);
              }}
              className="px-8 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              style={{ fontFamily: "'Swiss Grit', sans-serif" }}
            >
              QR Code
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              style={{ fontFamily: "'Swiss Grit', sans-serif" }}
            >
              About
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              style={{ fontFamily: "'Swiss Grit', sans-serif" }}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="pt-6 pb-8 px-32 flex items-center justify-between">
        {/* Left spacing to balance with menu button */}
        <div className="w-16"></div>
        
        {/* Title - Centered */}
        <h1 
          className="text-4xl" 
          style={{ 
            fontFamily: "'Swiss Grit', sans-serif",
            color: '#EF67A7',
            fontSize: '46px'
          }}
        >
          Why We Forget Food?
        </h1>
        
        {/* Right spacing */}
        <div className="w-16"></div>
      </div>
      
      {/* Welcome Image - Centered */}
      <div className="flex justify-center pb-8">
        <h2 
          style={{ 
            fontFamily: "'Swiss Grit', sans-serif",
            color: '#EF67A7',
            fontSize: '38px',
            letterSpacing: '0.05em'
          }}
        >
          WELCOME!
        </h2>
      </div>

      {/* Main Content */}
      <div className="px-32 pb-16">
        {/* Row 1 - Four cards (Tall, Medium, Medium, Tall) */}
        <div className="flex gap-8 justify-center items-end mb-2">
          {/* Card 1 - Tall */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '480px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row1-0') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row1-0')}
              onMouseLeave={() => toggleFlip('row1-0')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[0]} alt="Fridge 1" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[0].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[0].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[0].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[0].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 2 - Medium */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '360px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row1-1') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row1-1')}
              onMouseLeave={() => toggleFlip('row1-1')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[1]} alt="Fridge 2" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[1].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[1].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[1].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[1].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 3 - Medium */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '360px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row1-2') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row1-2')}
              onMouseLeave={() => toggleFlip('row1-2')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[2]} alt="Fridge 3" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[2].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[2].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[2].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[2].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 4 - Tall */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '480px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row1-3') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row1-3')}
              onMouseLeave={() => toggleFlip('row1-3')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[3]} alt="Fridge 4" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[3].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[3].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[3].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[3].quote2}"</div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider 1 - Fridge Shelf */}
        <div 
          className="w-full my-8"
          style={{ 
            height: '24px',
            backgroundColor: '#CED1E0'
          }}
        ></div>

        {/* Row 2 - Three large cards */}
        <div className="flex gap-8 justify-center mb-2">
          {/* Card 1 - Large */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '360px', height: '280px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row2-0') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row2-0')}
              onMouseLeave={() => toggleFlip('row2-0')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[4]} alt="Fridge 5" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[4].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[4].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[4].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[4].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 2 - Large */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '360px', height: '280px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row2-1') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row2-1')}
              onMouseLeave={() => toggleFlip('row2-1')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[5]} alt="Fridge 6" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[5].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[5].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[5].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[5].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 3 - Large */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '360px', height: '280px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row2-2') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row2-2')}
              onMouseLeave={() => toggleFlip('row2-2')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[6]} alt="Fridge 7" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[6].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[6].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[6].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[6].quote2}"</div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider 2 - Fridge Shelf */}
        <div 
          className="w-full my-8"
          style={{ 
            height: '24px',
            backgroundColor: '#CED1E0'
          }}
        ></div>

        {/* Row 3 - Four cards (Tall, Medium, Medium, Tall) */}
        <div className="flex gap-8 justify-center items-end mb-2">
          {/* Card 1 - Tall */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '480px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row3-0') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row3-0')}
              onMouseLeave={() => toggleFlip('row3-0')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[7]} alt="Fridge 8" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[7].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[7].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[7].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[7].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 2 - Medium */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '360px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row3-1') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row3-1')}
              onMouseLeave={() => toggleFlip('row3-1')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[8]} alt="Fridge 9" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[8].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[8].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[8].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[8].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 3 - Medium */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '360px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row3-2') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row3-2')}
              onMouseLeave={() => toggleFlip('row3-2')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[9]} alt="Fridge 10" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[9].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[9].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[9].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[9].quote2}"</div>
              </div>
            </div>
          </div>

          {/* Card 4 - Tall */}
          <div 
            className="bg-gray-200 border-2 border-gray-300 flex-shrink-0 cursor-pointer hover:bg-gray-250 transition-colors"
            style={{ width: '280px', height: '480px', perspective: '1000px' }}
            onClick={onNavigateToCook}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has('row3-3') ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onMouseEnter={() => toggleFlip('row3-3')}
              onMouseLeave={() => toggleFlip('row3-3')}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img src={fridges[10]} alt="Fridge 11" className="w-full h-full object-cover" />
              </div>
              {/* Back */}
              <div
                className="absolute w-full h-full border-2 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#EF67A7',
                  borderColor: '#FFFFFF'
                }}
              >
                <div>
                  <h3 className="mb-3 text-white" style={{ fontFamily: "'Swiss Grit', sans-serif" }}>{fridgeData[10].title}</h3>
                  <div className="text-sm mb-1 text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Forgotten items: {fridgeData[10].forgottenItems}</div>
                </div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[10].quote1}"</div>
                <div className="text-xs italic text-white" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>"{fridgeData[10].quote2}"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}