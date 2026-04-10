import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from './ui/button';
import newTomatoImage from 'figma:asset/709fb34eaefebe5751bbb22d3ac209ab2ab0ddf7.png';
import tomatoPanImage from 'figma:asset/f601fb634378f8bf5f800188ded8714becfe5148.png';
import carrotImage from 'figma:asset/cb5d26f32c96565a9274910c2136f6fe90039cd6.png';
import carrotPanImage from 'figma:asset/8b9c40e83eb1d7001b4198822488546ec9f104b3.png';
import yellowBellPepperImage from 'figma:asset/d774f16483089aecfb0cdfcef370f82fca0c6f2a.png';
import bellpepperPanImage from 'figma:asset/66f418276b36d546946a9c579ab79a6a538d51f6.png';
import snowPeasImage from 'figma:asset/3578ca8c32f8b0f0edca8e6a7e0ea4fd1da8033c.png';
import snowPeasPanImage from 'figma:asset/8377cf49c198f0a21c923b1206b196980c97fe1c.png';
import broccoliImage from 'figma:asset/d7f60e5c3458cfd9d38bdc16a3afcfcf1ff46add.png';
import broccoliPanImage from 'figma:asset/972edf4e9fc87f2e8b122b4914133ad66fbb2945.png';
import mushroomImage from 'figma:asset/f21db58549be5fdb84d5c683328777aa1a85e321.png';
import mushroomPanImage from 'figma:asset/91546c3ded568c77d3064c1e3a17ba7c99fbdf04.png';
import scallionImage from 'figma:asset/3915a08feefb23cef4162ce58f010e5fd042428f.png';
import scallionPanImage from 'figma:asset/3ea2f10dd63d586fa1323d70950ffa273c27e2de.png';
import backgroundImage from 'figma:asset/450a407c048bf817e397d491fd9dd06920621471.png';
import { RotateCcw, Shuffle, Home, Menu, X } from 'lucide-react';
import { ScrollableStrip } from './ScrollableStrip';
import { CookingPan } from './CookingPan';
import { Fireworks } from './Fireworks';
import { IngredientCard, type Ingredient } from './IngredientCard';
import { soundManager } from '../utils/sounds';

// Recipe combinations
const RECIPES: Record<string, string> = {
  'tomato1-carrot': 'Tomato & Carrot Salad',
  'tomato1-bellpepper': 'Tomato & Bell Pepper Salad',
  'tomato1-snowpeas': 'Tomato & Snow Peas Stir-Fry',
  'tomato1-broccoli': 'Broccoli & Tomato Stir-Fry',
  'tomato1-mushroom': 'Tomato & Mushroom Stew',
  'tomato1-scallion': 'Tomato & Scallion Stir-Fry',
  'carrot-bellpepper': 'Carrot Bell Pepper Mix',
  'carrot-snowpeas': 'Carrot Snow Peas Stir-Fry',
  'carrot-tomato1': 'Carrot Tomato',
  'carrot-broccoli': 'Carrot Broccoli',
  'carrot-mushroom': 'Carrot Mushroom Medley',
  'carrot-scallion': 'Carrot Scallion Stir-Fry',
  'bellpepper-tomato1': 'Bell Pepper & Tomato Mix',
  'bellpepper-carrot': 'Carrot Bell Pepper Blend',
  'bellpepper-snowpeas': 'Bell Pepper & Snow Peas',
  'bellpepper-broccoli': 'Broccoli & Bell Pepper Stir-Fry',
  'bellpepper-mushroom': 'Bell Pepper Mushroom Mix',
  'bellpepper-scallion': 'Bell Pepper Scallion Stir-Fry',
  'snowpeas-tomato1': 'Snow Peas & Tomato',
  'snowpeas-carrot': 'Snow Peas Carrot Stir-Fry',
  'snowpeas-bellpepper': 'Snow Peas & Bell Pepper',
  'snowpeas-broccoli': 'Broccoli & Snow Peas Stir-Fry',
  'snowpeas-mushroom': 'Snow Peas & Mushroom',
  'snowpeas-scallion': 'Snow Peas & Scallion Stir-Fry',
  'broccoli-tomato1': 'Tomato & Broccoli Stir-Fry',
  'broccoli-carrot': 'Carrot Glazed Broccoli',
  'broccoli-bellpepper': 'Bell Pepper Broccoli Stir-Fry',
  'broccoli-snowpeas': 'Snow Peas & Broccoli Stir-Fry',
  'broccoli-mushroom': 'Broccoli & Mushroom Mix',
  'broccoli-scallion': 'Broccoli & Scallion Stir-Fry',
  'mushroom-tomato1': 'Mushroom & Tomato Stir-Fry',
  'mushroom-carrot': 'Carrot Mushroom Sauté',
  'mushroom-bellpepper': 'Bell Pepper Mushroom',
  'mushroom-snowpeas': 'Mushroom & Snow Peas',
  'mushroom-broccoli': 'Mushroom & Broccoli',
  'mushroom-scallion': 'Mushroom & Scallion Stir-Fry',
  'scallion-tomato1': 'Scallion & Tomato Stir-Fry',
  'scallion-carrot': 'Scallion Carrot Mix',
  'scallion-bellpepper': 'Scallion & Bell Pepper',
  'scallion-snowpeas': 'Scallion & Snow Peas',
  'scallion-broccoli': 'Scallion & Broccoli',
  'scallion-mushroom': 'Scallion & Mushroom Stir-Fry',
};

interface CookingPageProps {
  onGoHome: () => void;
  forgottenFoods?: ForgottenFood[];
}

interface ForgottenFood {
  id: number;
  name: string;
  quantity?: string;
  tags: string[];
  daysInFridge: number;
  note: string;
  status: 'forgotten' | 'uncertain' | 'sad';
}

export function CookingPage({ onGoHome, forgottenFoods }: CookingPageProps) {
  const [ingredientsInPan, setIngredientsInPan] = useState<Ingredient[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<string>('');
  const [showFireworks, setShowFireworks] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [sizzleAudio] = useState(() => {
    // Mock audio - in production you'd use real audio files
    const audio = new Audio();
    audio.volume = 0; // Silent for demo
    return audio;
  });

  const allIngredients: Ingredient[] = [
    {
      id: 'tomato1',
      name: 'Tomato',
      image: newTomatoImage,
      panImage: tomatoPanImage,
      color: '#FF6347',
    },
    {
      id: 'carrot',
      name: 'Carrot',
      image: carrotImage,
      panImage: carrotPanImage,
      color: '#FFA500',
    },
    {
      id: 'bellpepper',
      name: 'Bell Pepper',
      image: yellowBellPepperImage,
      panImage: bellpepperPanImage,
      color: '#F4C542',
    },
    {
      id: 'snowpeas',
      name: 'Snow Peas',
      image: snowPeasImage,
      panImage: snowPeasPanImage,
      color: '#90EE90',
    },
    {
      id: 'broccoli',
      name: 'Broccoli',
      image: broccoliImage,
      panImage: broccoliPanImage,
      color: '#228B22',
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      image: mushroomImage,
      panImage: mushroomPanImage,
      color: '#8B4513',
    },
    {
      id: 'scallion',
      name: 'Scallion',
      image: scallionImage,
      panImage: scallionPanImage,
      color: '#8B4513',
    },
  ];

  const leftIngredients = [allIngredients[0], allIngredients[1], allIngredients[4], allIngredients[6]];
  const rightIngredients = [allIngredients[2], allIngredients[3], allIngredients[5], allIngredients[6]];

  const playSizzle = useCallback(() => {
    // In production, load and play a sizzling sound effect
    console.log('🔥 Sizzle sound!');
    sizzleAudio.play().catch(() => {
      // Ignore audio play errors
    });
  }, [sizzleAudio]);

  const playFireworks = useCallback(() => {
    // In production, load and play celebration sound
    console.log('🎉 Celebration sound!');
    setShowFireworks(true);
  }, []);

  const handleDrop = useCallback((ingredient: Ingredient) => {
    setIngredientsInPan((prev) => {
      // Limit to 5 ingredients
      if (prev.length >= 5) {
        return prev;
      }
      
      // Don't add duplicate
      if (prev.some((i) => i.id === ingredient.id)) {
        return prev;
      }

      playSizzle();
      const newIngredients = [...prev, ingredient];
      
      // Check if we have at least 2 ingredients to make a recipe
      if (newIngredients.length >= 2) {
        // Generate recipe name based on ingredients
        let recipe = '';
        if (newIngredients.length === 2) {
          const recipeKey = `${newIngredients[0].id}-${newIngredients[1].id}`;
          recipe = RECIPES[recipeKey] || `${newIngredients[0].name} & ${newIngredients[1].name} Mix`;
        } else {
          // For 3+ ingredients, create a multi-ingredient recipe name
          const ingredientNames = newIngredients.map(i => i.name).join(', ');
          recipe = `${newIngredients.length}-Ingredient Rescue Mix: ${ingredientNames}`;
        }
        setCurrentRecipe(recipe);
        
        // Play celebration after a short delay (only on first recipe creation)
        if (prev.length === 1) {
          setTimeout(() => {
            playFireworks();
          }, 500);
        }
      }
      
      return newIngredients;
    });
  }, [playSizzle, playFireworks]);

  const handleReset = useCallback(() => {
    setIngredientsInPan([]);
    setCurrentRecipe('');
    setShowFireworks(false);
    setShowRecipeDetails(false);
  }, []);

  const handleRandomMix = useCallback(() => {
    // Play stir-frying sound when Random Mix is clicked
    soundManager.playSizzleSound();
    
    // Pick 2 random different ingredients
    const shuffled = [...allIngredients].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);
    
    handleReset();
    
    // Add them with a slight delay for effect
    setTimeout(() => {
      handleDrop(selected[0]);
      setTimeout(() => {
        handleDrop(selected[1]);
      }, 300);
    }, 100);
  }, [allIngredients, handleReset, handleDrop]);

  const menuItems = ['Co-Cook', 'About'];

  return (
    <DndProvider backend={HTML5Backend}>
      <div 
        className="w-screen h-screen flex flex-col md:flex-row overflow-hidden relative"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: "'Mundial Narrow Variable', sans-serif"
        }}
      >
        {/* Page Title */}
        <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50">
          <h1 className="text-2xl md:text-3xl" style={{ fontFamily: "'Swiss Grit', sans-serif", color: '#EF67A7', fontSize: 'clamp(24px, 5vw, 40px)' }}>CO-COOK RECIPE</h1>
        </div>

        {/* Circular Menu Button - Top Left Corner */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed top-4 md:top-6 left-4 md:left-6 z-50 w-12 h-12 md:w-16 md:h-16 transition-colors flex items-center justify-center border-2 relative overflow-hidden"
          style={{ 
            backgroundColor: '#EF67A7',
            borderColor: '#EF67A7',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '100% 100%',
            backgroundBlendMode: 'multiply',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 85% 100%, 0% 100%)',
            borderRadius: '50%',
            opacity: 0.8
          }}
        >
          {menuOpen ? <X className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" /> : <Menu className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />}
        </button>

        {/* Menu Panel */}
        {menuOpen && (
          <div className="fixed top-20 md:top-28 left-4 md:left-6 z-40 bg-white border-2 border-gray-300 rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="flex flex-col gap-2 md:gap-3">
              <button
                onClick={() => {
                  onGoHome();
                  setMenuOpen(false);
                }}
                className="px-6 md:px-8 py-2 md:py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 text-sm md:text-base"
                style={{ fontFamily: "'Swiss Grit', sans-serif", color: '#EF67A7' }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="px-6 md:px-8 py-2 md:py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 text-sm md:text-base"
                style={{ fontFamily: "'Swiss Grit', sans-serif", color: '#EF67A7' }}
              >
                Co-Cook
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="px-6 md:px-8 py-2 md:py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 text-sm md:text-base"
                style={{ fontFamily: "'Swiss Grit', sans-serif", color: '#EF67A7' }}
              >
                About
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="px-6 md:px-8 py-2 md:py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 text-sm md:text-base"
                style={{ fontFamily: "'Swiss Grit', sans-serif", color: '#EF67A7' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}

        {/* Mobile: Top Strip - Roommate 1's ingredients */}
        <div className="md:hidden h-32 border-b border-gray-200 flex-shrink-0 pt-16">
          <ScrollableStrip ingredients={leftIngredients} position="left" label="Roommate 1's" />
        </div>

        {/* Desktop: Left Strip - Roommate 1's ingredients */}
        <div className="hidden md:block w-64 border-r border-gray-200 flex-shrink-0">
          <ScrollableStrip ingredients={leftIngredients} position="left" label="Roommate 1's" />
        </div>

        {/* Center Cooking Area */}
        <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
          <div className="flex flex-col items-center gap-2 md:gap-4 w-full">
            {/* Main cooking section */}
            <div className="relative scale-75 md:scale-100">
              <div className="relative">
                <CookingPan ingredientsInPan={ingredientsInPan} onDrop={handleDrop} />
                <Fireworks show={showFireworks} onComplete={() => setShowFireworks(false)} />
              </div>
            </div>

            {/* Recipe name */}
            <div className="min-h-12 md:min-h-16 flex items-center justify-center px-4">
              {currentRecipe && (
                <div className="bg-white border-2 border-black px-4 md:px-8 py-2 md:py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-lg md:text-2xl text-center" style={{ color: '#EF67A7', fontFamily: "'Mundial Narrow Variable', sans-serif" }}>{currentRecipe}</p>
                </div>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
              <Button
                onClick={handleRandomMix}
                variant="outline"
                size="sm"
                className="text-xs md:text-base"
                style={{ color: '#EF67A7', borderColor: '#EF67A7', fontFamily: "'Swiss Grit', sans-serif" }}
              >
                <Shuffle className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                Random Mix
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="text-xs md:text-base"
                style={{ color: '#EF67A7', borderColor: '#EF67A7', fontFamily: "'Swiss Grit', sans-serif" }}
              >
                <RotateCcw className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                Reset
              </Button>
              {currentRecipe && (
                <Button
                  onClick={() => setShowRecipeDetails(!showRecipeDetails)}
                  variant="default"
                  size="sm"
                  className="text-xs md:text-base"
                  style={{ backgroundColor: '#EF67A7', borderColor: '#EF67A7', color: 'white' }}
                >
                  {showRecipeDetails ? 'Hide Details' : 'View Recipe Details'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Bottom Strip - Roommate 2's ingredients */}
        <div className="md:hidden h-32 border-t border-gray-200 flex-shrink-0">
          <ScrollableStrip ingredients={rightIngredients} position="right" label="Roommate 2's" />
        </div>

        {/* Desktop: Right Strip - Roommate 2's ingredients */}
        <div className="hidden md:block w-64 border-l border-gray-200 flex-shrink-0">
          <ScrollableStrip ingredients={rightIngredients} position="right" label="Roommate 2's" />
        </div>

        {/* Recipe Details Panel */}
        {showRecipeDetails && currentRecipe && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 overflow-y-auto max-h-[40vh] z-20">
            <div className="p-6 relative">
              {/* Close button */}
              <button
                onClick={() => setShowRecipeDetails(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="mb-4 pr-12">{currentRecipe}</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Flexible Ingredients */}
                <div>
                  <div className="mb-3 text-sm" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Ingredients (by category - not exact!):</div>
                  <div className="space-y-2 text-sm mb-6" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>
                    <div>
                      <span className="text-gray-700">Base:</span>{' '}
                      <span className="text-gray-600">
                        {ingredientsInPan[0]?.name || 'Any fresh ingredient'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-700">Pairing:</span>{' '}
                      <span className="text-gray-600">
                        {ingredientsInPan[1]?.name || 'Any complementary ingredient'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-700">Seasoning (optional):</span>{' '}
                      <span className="text-gray-600">Salt, pepper, herbs, or your favorite sauce</span>
                    </div>
                    <div>
                      <span className="text-gray-700">Extra (optional):</span>{' '}
                      <span className="text-gray-600">Garlic, onion, or any aromatics you have</span>
                    </div>
                  </div>

                  {/* Flex Slots */}
                  <div className="mb-4">
                    <div className="text-sm mb-2" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Ingredient Slots (drag from forgotten foods):</div>
                    <div className="grid grid-cols-2 gap-2">
                      {['Veg 1', 'Veg 2', 'Protein', 'Base'].map((slotName, i) => (
                        <div
                          key={i}
                          className="border-2 border-dashed border-gray-300 bg-gray-50 p-3 min-h-[60px] flex items-center justify-center text-xs text-gray-400"
                          style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}
                        >
                          {slotName}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-2 italic" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>
                      This recipe doesn't need perfect ingredients. It just needs a chance.
                    </div>
                  </div>
                </div>

                {/* Right Column - Flexible Steps */}
                <div>
                  <div className="mb-3 text-sm" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Steps (flexible approach):</div>
                  <ol className="space-y-2 text-sm list-decimal list-inside mb-6" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>
                    <li className="text-gray-700">Prep all ingredients roughly — don't worry about perfect cuts.</li>
                    <li className="text-gray-700">Cook harder ingredients first, then add softer ones.</li>
                    <li className="text-gray-700">Season to taste and adjust as you go.</li>
                    <li className="text-gray-700">Don't worry about perfection — it's about rescuing food, not restaurant quality.</li>
                  </ol>

                  {/* Safety Tip */}
                  <div className="bg-yellow-50 border border-yellow-200 p-3 text-sm" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>
                    <span>💡 Safety Tip: </span>
                    If the smell is off or there is mold, don't use it — no recipe is worth getting sick.
                  </div>
                </div>
              </div>

              {/* Forgotten Foods from Fridge */}
              {forgottenFoods && forgottenFoods.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="mb-3 text-sm" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>Your Forgotten Foods (from fridge):</div>
                  <div className="flex gap-2 flex-wrap">
                    {forgottenFoods.map((food) => (
                      <div
                        key={food.id}
                        className="px-3 py-2 bg-blue-50 border border-blue-200 text-sm cursor-move hover:bg-blue-100"
                        style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}
                        draggable
                      >
                        {food.name} ({food.daysInFridge}d)
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 italic" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>
                    💡 Drag these into the slots above to plan your recipe
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}