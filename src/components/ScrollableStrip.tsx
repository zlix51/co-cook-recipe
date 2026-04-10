import { Ingredient } from './IngredientCard';
import { IngredientCard } from './IngredientCard';

interface ScrollableStripProps {
  ingredients: Ingredient[];
  position: 'left' | 'right';
  label: string;
}

export function ScrollableStrip({ ingredients, position, label }: ScrollableStripProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Label */}
      <div className="pt-24 px-6 pb-6 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg" style={{ fontFamily: "'Swiss Grit', sans-serif", color: '#EF67A7', fontSize: '36px' }}>
          {label}
        </h2>
      </div>
      
      {/* Scrollable container - Vertical */}
      <div 
        className="flex-1 overflow-y-auto py-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style>
          {`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className="flex flex-col gap-6 items-center px-4">
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </div>
      
      {/* Scroll hint */}
      <div className="p-4 text-center text-xs border-t border-gray-200 flex-shrink-0" style={{ color: '#EF67A7' }}>
        ↑ Scroll ↓
      </div>
    </div>
  );
}