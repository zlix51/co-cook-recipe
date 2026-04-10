import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { CookingPage } from './components/CookingPage';
import { FridgeDetailPage } from './components/FridgeDetailPage';
import { QRCodePage } from './components/QRCodePage';

interface ForgottenFood {
  id: number;
  name: string;
  quantity?: string;
  tags: string[];
  daysInFridge: number;
  note: string;
  status: 'forgotten' | 'uncertain' | 'sad';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'fridgeDetail' | 'cooking' | 'qrcode'>('home');
  const [selectedFridge, setSelectedFridge] = useState<number | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<ForgottenFood[]>([]);

  const handleSelectFridge = (fridgeId: number) => {
    setSelectedFridge(fridgeId);
    setCurrentPage('fridgeDetail');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setSelectedFridge(null);
    setSelectedFoods([]);
  };

  const handleAddToCoCook = (foods: ForgottenFood[]) => {
    setSelectedFoods(foods);
    setCurrentPage('cooking');
  };

  const handleNavigateToCook = () => {
    setCurrentPage('cooking');
  };

  const handleNavigateToQRCode = () => {
    setCurrentPage('qrcode');
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage 
          onSelectFridge={handleSelectFridge} 
          onNavigateToCook={handleNavigateToCook}
          onNavigateToQRCode={handleNavigateToQRCode}
        />
      )}
      
      {currentPage === 'fridgeDetail' && selectedFridge && (
        <FridgeDetailPage
          fridgeId={selectedFridge}
          onBack={handleGoHome}
          onAddToCoCook={handleAddToCoCook}
        />
      )}
      
      {currentPage === 'cooking' && (
        <CookingPage onGoHome={handleGoHome} forgottenFoods={selectedFoods} />
      )}
      
      {currentPage === 'qrcode' && (
        <QRCodePage onBack={handleGoHome} />
      )}
    </>
  );
}