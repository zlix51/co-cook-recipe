import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface FridgeDetailPageProps {
  fridgeId: number;
  onBack: () => void;
  onAddToCoCook: (foodItems: ForgottenFood[]) => void;
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

const forgottenFoodsData: ForgottenFood[] = [
  {
    id: 1,
    name: 'Tomato',
    quantity: 'x2',
    tags: ['Soft', 'Wrinkled'],
    daysInFridge: 27,
    note: 'I bought these for salad but kept ordering takeout.',
    status: 'sad'
  },
  {
    id: 2,
    name: 'Spinach',
    tags: ['Wilted', 'Wet'],
    daysInFridge: 23,
    note: 'It looked so fresh at the market.',
    status: 'forgotten'
  },
  {
    id: 3,
    name: 'Bell Pepper',
    quantity: 'x1',
    tags: ['Soft spots'],
    daysInFridge: 18,
    note: 'Was planning to make stuffed peppers.',
    status: 'uncertain'
  },
  {
    id: 4,
    name: 'Milk',
    quantity: '500ml',
    tags: ['Near expiry'],
    daysInFridge: 12,
    note: 'Bought it when it was on sale.',
    status: 'uncertain'
  },
  {
    id: 5,
    name: 'Leftover Rice',
    tags: ['Dry', 'Hard'],
    daysInFridge: 5,
    note: 'From last week\'s takeout.',
    status: 'forgotten'
  },
  {
    id: 6,
    name: 'Half Onion',
    tags: ['Dry edges'],
    daysInFridge: 8,
    note: 'Only needed half for the recipe.',
    status: 'sad'
  },
  {
    id: 7,
    name: 'Cabbage',
    quantity: '1/4',
    tags: ['Dry', 'Browning'],
    daysInFridge: 15,
    note: 'Too much for one person.',
    status: 'forgotten'
  },
];

const participantQuotes = [
  '"If I can\'t remember the date, I just throw it away."',
  '"I feel guilty, but I\'m also scared of getting sick."',
  '"Sometimes I buy things just because they\'re on sale."',
  '"I forget what\'s in the back of the fridge."',
  '"Cooking for one is hard - everything comes in big portions."',
];

export function FridgeDetailPage({ fridgeId, onBack, onAddToCoCook }: FridgeDetailPageProps) {
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [showEdibleDialog, setShowEdibleDialog] = useState<number | null>(null);

  const toggleFoodSelection = (foodId: number) => {
    setSelectedFoods(prev =>
      prev.includes(foodId)
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId]
    );
  };

  const handleAddToCoCook = () => {
    const selectedItems = forgottenFoodsData.filter(food => selectedFoods.includes(food.id));
    onAddToCoCook(selectedItems);
  };

  const handleRemoveFood = (foodId: number) => {
    // In a real app, this would remove the food from the list
    alert('Food removed/composted');
  };

  const EdibleDialog = ({ food }: { food: ForgottenFood }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-md w-full mx-4">
        <h3 className="mb-6">Is {food.name} still edible?</h3>
        
        <div className="space-y-6 mb-6">
          <div>
            <div className="mb-2">👁️ Look</div>
            <div className="text-sm text-gray-600">Are there any visible signs of mold, discoloration, or sliminess?</div>
          </div>
          
          <div>
            <div className="mb-2">👃 Smell</div>
            <div className="text-sm text-gray-600">Does it smell sour, sharp, or off in any way?</div>
          </div>
          
          <div>
            <div className="mb-2">🕐 Time</div>
            <div className="text-sm text-gray-600">Can you remember when you bought this? ({food.daysInFridge} days ago)</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 text-sm">
          If the smell is off or there is mold, don't use it — no recipe is worth getting sick.
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowEdibleDialog(null)}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={() => {
              toggleFoodSelection(food.id);
              setShowEdibleDialog(null);
            }}
            className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700"
          >
            It looks okay!
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-white flex">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Fridges
          </button>
          
          <h1 className="mb-4" style={{ fontFamily: "'Swiss Grit', sans-serif", fontSize: '34px' }}>
            Max's Fridge — Week 5
          </h1>
          
          <div className="flex gap-8 text-sm">
            <div>
              <span className="text-gray-500">Total items:</span> 34
            </div>
            <div>
              <span className="text-gray-500">Forgotten / "Not sure":</span> {forgottenFoodsData.length}
            </div>
            <div>
              <span className="text-gray-500">Average time in fridge:</span> 15 days
            </div>
          </div>
        </div>

        {/* Forgotten Food List */}
        <div className="p-8">
          <h2 className="mb-6">Forgotten Food</h2>
          
          <div className="space-y-4">
            {forgottenFoodsData.map(food => (
              <div
                key={food.id}
                className={`border-2 p-6 transition-colors ${
                  selectedFoods.includes(food.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="mb-2">
                      {food.name} {food.quantity && `(${food.quantity})`}
                    </h3>
                    <div className="flex gap-2 mb-2">
                      {food.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-200 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      In fridge for {food.daysInFridge} days
                    </div>
                  </div>
                </div>

                <div className="mb-4 text-sm italic text-gray-700 bg-gray-50 p-3">
                  "{food.note}"
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setShowEdibleDialog(food.id)}
                    className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50"
                  >
                    Help me decide if this is edible
                  </button>
                  <button
                    onClick={() => toggleFoodSelection(food.id)}
                    className={`px-4 py-2 text-sm ${
                      selectedFoods.includes(food.id)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {selectedFoods.includes(food.id) ? '✓ Added to Co-Cook' : 'Add to Co-Cook Lab'}
                  </button>
                  <button
                    onClick={() => handleRemoveFood(food.id)}
                    className="px-4 py-2 text-sm border border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Remove / Compost
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Co-Cook Button */}
          {selectedFoods.length > 0 && (
            <div className="mt-8 sticky bottom-8 bg-white border-2 border-green-600 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="mb-1">
                    {selectedFoods.length} item{selectedFoods.length > 1 ? 's' : ''} selected
                  </div>
                  <div className="text-sm text-gray-600">
                    Ready to give them a second chance?
                  </div>
                </div>
                <button
                  onClick={handleAddToCoCook}
                  className="px-6 py-3 bg-green-600 text-white hover:bg-green-700"
                >
                  Go to Co-Cook Lab →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Quotes */}
      <div className="w-80 border-l border-gray-200 p-8 bg-gray-50">
        <h3 className="mb-6">From Our Participants</h3>
        <div className="space-y-6">
          {participantQuotes.map((quote, i) => (
            <div
              key={i}
              className="text-sm italic text-gray-700 pb-6 border-b border-gray-200 last:border-b-0"
            >
              {quote}
            </div>
          ))}
        </div>
      </div>

      {/* Edible Check Dialog */}
      {showEdibleDialog !== null && (
        <EdibleDialog food={forgottenFoodsData.find(f => f.id === showEdibleDialog)!} />
      )}
    </div>
  );
}