import { useDrag } from 'react-dnd';
import { soundManager } from '../utils/sounds';

export interface Ingredient {
  id: string;
  name: string;
  image: string;
  panImage?: string; // Optional image to display when in the pan
  color?: string;
}

interface IngredientCardProps {
  ingredient: Ingredient;
}

export function IngredientCard({ ingredient }: IngredientCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    // Play drag sound when starting to drag
    soundManager.playDragSound();
  };

  return (
    <div
      ref={drag}
      className="flex-shrink-0 w-44 h-44 cursor-move select-none"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDragStart={onDragStart}
    >
      <div className="w-full h-full overflow-hidden relative flex flex-col hover:opacity-80 transition-opacity">
        <div className="flex-1 flex items-center justify-center p-3">
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="max-w-full max-h-full object-contain pointer-events-none"
            draggable={false}
          />
        </div>
        <div className="p-2 text-center text-sm pointer-events-none" style={{ color: '#EF67A7' }}>
          {ingredient.name}
        </div>
      </div>
    </div>
  );
}