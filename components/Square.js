import React from 'react';

const Square = ({ value, onClick, isWinningSquare }) => {
  const playerXColor = 'text-blue-400';
  const playerOColor = 'text-red-400';
  
  const textColor = value === 'X' ? playerXColor : playerOColor;
  const baseStyle = 'bg-gray-800';
  const winningStyle = 'bg-yellow-500/50';
  const hoverStyle = 'hover:bg-gray-700';

  return React.createElement('button', {
    className: `w-24 h-24 sm:w-28 sm:h-28 rounded-lg flex items-center justify-center text-5xl font-bold transition-colors duration-200 ${
      isWinningSquare ? winningStyle : baseStyle
    } ${!value && !isWinningSquare ? hoverStyle : ''}`,
    onClick: onClick,
    disabled: !!value,
    'aria-label': `Square with value ${value || 'empty'}`
  },
    React.createElement('span', { className: textColor }, value)
  );
};

export default Square;