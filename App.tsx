
import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import type { Player, BoardState } from './types';

const initialBoard: BoardState = Array(9).fill(null);

const calculateWinner = (currentBoard: BoardState): { winner: Player | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
      return { winner: currentBoard[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
};


const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winnerInfo, setWinnerInfo] = useState<{ winner: Player | 'Draw' | null, line: number[] | null }>({ winner: null, line: null });

  useEffect(() => {
    const { winner, line } = calculateWinner(board);
    if (winner) {
      setWinnerInfo({ winner, line });
    } else if (board.every(square => square !== null)) {
      setWinnerInfo({ winner: 'Draw', line: null });
    }
  }, [board]);

  const aiMove = useCallback(() => {
    const makeMove = (index: number) => {
      const newBoard = [...board];
      newBoard[index] = 'O';
      setBoard(newBoard);
      setIsPlayerTurn(true);
    };

    const emptySquares = board
      .map((val, index) => (val === null ? index : null))
      .filter((val): val is number => val !== null);

    // Rule 1: Win if possible
    for (const move of emptySquares) {
      const tempBoard = [...board];
      tempBoard[move] = 'O';
      if (calculateWinner(tempBoard).winner === 'O') {
        makeMove(move);
        return;
      }
    }

    // Rule 2: Block player from winning
    for (const move of emptySquares) {
      const tempBoard = [...board];
      tempBoard[move] = 'X';
      if (calculateWinner(tempBoard).winner === 'X') {
        makeMove(move);
        return;
      }
    }

    // Rule 3: Take the center
    if (board[4] === null) {
      makeMove(4);
      return;
    }

    // Rule 4: Take an available corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => board[index] === null);
    if (availableCorners.length > 0) {
      const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
      makeMove(randomCorner);
      return;
    }

    // Rule 5: Take an available side
    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter(index => board[index] === null);
    if (availableSides.length > 0) {
        const randomSide = availableSides[Math.floor(Math.random() * availableSides.length)];
        makeMove(randomSide);
        return;
    }
  }, [board]);

  useEffect(() => {
    if (!isPlayerTurn && !winnerInfo.winner) {
      const timer = setTimeout(() => {
        aiMove();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winnerInfo.winner, aiMove]);

  const handleSquareClick = (index: number) => {
    if (board[index] || winnerInfo.winner || !isPlayerTurn) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setWinnerInfo({ winner: null, line: null });
  };

  const getStatusMessage = () => {
    if (winnerInfo.winner) {
      if (winnerInfo.winner === 'Draw') {
        return "It's a Draw!";
      }
      return winnerInfo.winner === 'X' ? "You Win! 🎉" : "AI Wins! 🤖";
    }
    return isPlayerTurn ? "Your Turn (X)" : "AI's Turn (O)";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
          SuzTac
        </h1>
      </header>
      <main className="flex flex-col items-center">
        <div className="h-10 mb-4 flex items-center">
          <p className="text-2xl font-semibold text-gray-300 transition-opacity duration-300">
            {getStatusMessage()}
          </p>
        </div>
        <Board 
          board={board} 
          onSquareClick={handleSquareClick} 
          winningLine={winnerInfo.line}
        />
        <button 
          onClick={handleReset}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-200"
        >
          Reset Game
        </button>
      </main>
    </div>
  );
};

export default App;
