import React from 'react';
import Square from './Square.js';

const Board = ({ board, onSquareClick, winningLine }) => {
  return React.createElement('div', { className: "grid grid-cols-3 gap-3 p-3 bg-gray-950/50 rounded-lg shadow-lg" },
    board.map((value, index) =>
      React.createElement(Square, {
        key: index,
        value: value,
        onClick: () => onSquareClick(index),
        isWinningSquare: winningLine?.includes(index) ?? false
      })
    )
  );
};

export default Board;