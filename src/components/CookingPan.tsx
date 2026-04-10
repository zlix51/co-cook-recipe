import { useDrop } from 'react-dnd';
import { Ingredient } from './IngredientCard';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/sounds';
import potImage from 'figma:asset/a034bf7fc9d7623da1fc83d558f813c4623ccf56.png';

interface CookingPanProps {
  ingredientsInPan: Ingredient[];
  onDrop: (ingredient: Ingredient) => void;
}

export function CookingPan({ ingredientsInPan, onDrop }: CookingPanProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: Ingredient) => {
      // Play sizzle sound when ingredient is dropped
      soundManager.playSizzleSound();
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="relative w-[600px] h-[600px] flex items-center justify-center"
      style={{
        filter: isOver ? 'brightness(1.1)' : 'brightness(1)',
        transition: 'filter 0.3s ease',
      }}
    >
      {/* Pot image background */}
      <img 
        src={potImage} 
        alt="Cooking pot" 
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
      
      {/* Ingredients in pan - positioned in the center of the pot */}
      <div className="relative w-[450px] h-[450px] rounded-full overflow-hidden">
        {ingredientsInPan.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-600 opacity-70" style={{ fontFamily: "'Mundial Narrow Variable', sans-serif" }}>
              Drag ingredients here
            </p>
          </div>
        )}
        
        {ingredientsInPan.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-500"
            style={{
              mixBlendMode: index === 0 ? 'normal' : 'multiply',
              zIndex: index,
            }}
          >
            <img
              src={ingredient.panImage || ingredient.image}
              alt={ingredient.name}
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.2) saturate(1.3)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}