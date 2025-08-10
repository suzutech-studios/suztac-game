
import React from 'react';
import type { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  const playerXColor = 'text-blue-400';
  const playerOColor = 'text-red-400';
  
  const textColor = value === 'X' ? playerXColor : playerOColor;
  const baseStyle = 'bg-gray-800';
  const winningStyle = 'bg-yellow-500/50';
  const hoverStyle = 'hover:bg-gray-700';

  return (
    <button
      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-lg flex items-center justify-center text-5xl font-bold transition-colors duration-200 ${
        isWinningSquare ? winningStyle : baseStyle
      } ${!value && !isWinningSquare ? hoverStyle : ''}`}
      onClick={onClick}
      disabled={!!value}
      aria-label={`Square with value ${value || 'empty'}`}
    >
      <span className={textColor}>{value}</span>
    </button>
  );
};

export default Square;
