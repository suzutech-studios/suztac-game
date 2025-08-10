
import React from 'react';
import Square from './Square';
import type { BoardState } from '../types';

interface BoardProps {
  board: BoardState;
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ board, onSquareClick, winningLine }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-3 bg-gray-950/50 rounded-lg shadow-lg">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinningSquare={winningLine?.includes(index) ?? false}
        />
      ))}
    </div>
  );
};

export default Board;
