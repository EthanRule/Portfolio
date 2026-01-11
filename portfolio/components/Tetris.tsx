"use client";
import { useState, useEffect, useRef } from "react";

export default function Tetris() {
  const [mounted, setMounted] = useState(false);
  const [isPlayerMode, setIsPlayerMode] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [countdown, setCountdown] = useState<number | 'GO' | null>(null);
  const [piecesSpawned, setPiecesSpawned] = useState(0);
  const isPlayerModeRef = useRef(isPlayerMode);
  const gameSpeedRef = useRef(400);
  const [gameState, setGameState] = useState<{
    board: number[][];
    boardPieceTypes: number[][];
    fallingPiece: { shape: number[][]; x: number; y: number; pieceType: number } | null;
    aiTarget: { shape: number[][]; x: number; y: number } | null;
    flashingRows: number[];
    isPaused: boolean;
  }>({
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
    fallingPiece: null,
    aiTarget: null,
    flashingRows: [],
    isPaused: false,
  });

  const gameOverPattern = {
    GG: [
      [0,1,1,1,0,0,1,1,1,0],
      [1,0,0,0,0,1,0,0,0,0],
      [1,0,1,1,0,1,0,1,1,0],
      [1,0,0,1,0,1,0,0,1,0],
      [0,1,1,1,0,0,1,1,1,0],
    ],
  };

  const countdownPatterns: { [key: string]: number[][] } = {
    '5': [
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,1,1,0,0],
      [0,0,0,1,0],
      [1,1,1,1,0],
    ],
    '4': [
      [1,0,0,1,0],
      [1,0,0,1,0],
      [1,1,1,1,0],
      [0,0,0,1,0],
      [0,0,0,1,0],
    ],
    '3': [
      [1,1,1,1,0],
      [0,0,0,1,0],
      [1,1,1,1,0],
      [0,0,0,1,0],
      [1,1,1,1,0],
    ],
    '2': [
      [1,1,1,1,0],
      [0,0,0,1,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
    ],
    '1': [
      [0,1,0,0,0],
      [1,1,0,0,0],
      [0,1,0,0,0],
      [0,1,0,0,0],
      [1,1,1,0,0],
    ],
    'GO': [
      [1,1,1,0,1,1,1,1,0],
      [1,0,0,0,1,0,0,1,0],
      [1,1,1,0,1,0,0,1,0],
      [1,0,1,0,1,0,0,1,0],
      [1,1,1,0,0,1,1,0,0],
    ],
  };

  const pieces = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 1]],
  ];

  const rotatePiece = (piece: number[][]): number[][] => {
    const rows = piece.length;
    const cols = piece[0].length;
    const rotated: number[][] = [];
    for (let i = 0; i < cols; i++) {
      rotated[i] = [];
      for (let j = 0; j < rows; j++) {
        rotated[i][j] = piece[rows - 1 - j][i];
      }
    }
    return rotated;
  };

  const getAllRotations = (piece: number[][]): number[][][] => {
    const rotations = [piece];
    let current = piece;
    for (let i = 0; i < 3; i++) {
      current = rotatePiece(current);
      const isUnique = !rotations.some(
        (r) => JSON.stringify(r) === JSON.stringify(current)
      );
      if (isUnique) {
        rotations.push(current);
      } else {
        break;
      }
    }
    return rotations;
  };

  const canPlacePiece = (
    board: number[][],
    piece: number[][],
    x: number,
    y: number
  ): boolean => {
    return piece.every((row, dy) => {
      return row.every((cell, dx) => {
        if (!cell) return true;
        const newY = y + dy;
        const newX = x + dx;
        if (newY >= 20) return false;
        if (newX < 0 || newX >= 10) return false;
        if (newY < 0) return true;
        return board[newY][newX] === 0;
      });
    });
  };

  const dropPiece = (
    board: number[][],
    piece: number[][],
    x: number
  ): number => {
    let y = 0;
    while (canPlacePiece(board, piece, x, y + 1)) {
      y++;
    }
    return y;
  };

  const evaluatePlacement = (
    board: number[][],
    piece: number[][],
    x: number,
    y: number
  ): number => {
    const newBoard = board.map((row) => [...row]);
    piece.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell) {
          const placeY = y + dy;
          const placeX = x + dx;
          if (placeY >= 0 && placeY < 20 && placeX >= 0 && placeX < 10) {
            newBoard[placeY][placeX] = 1;
          }
        }
      });
    });
    const linesCleared = newBoard.filter((row) =>
      row.every((cell) => cell === 1)
    ).length;
    const columnHeights: number[] = [];
    for (let col = 0; col < 10; col++) {
      let height = 0;
      for (let row = 0; row < 20; row++) {
        if (newBoard[row][col] === 1) {
          height = 20 - row;
          break;
        }
      }
      columnHeights.push(height);
    }
    const aggregateHeight = columnHeights.reduce((sum, h) => sum + h, 0);
    let holes = 0;
    for (let col = 0; col < 10; col++) {
      let foundBlock = false;
      for (let row = 0; row < 20; row++) {
        if (newBoard[row][col] === 1) {
          foundBlock = true;
        } else if (foundBlock && newBoard[row][col] === 0) {
          holes++;
        }
      }
    }
    let bumpiness = 0;
    for (let i = 0; i < 9; i++) {
      bumpiness += Math.abs(columnHeights[i] - columnHeights[i + 1]);
    }
    return (
      linesCleared * 1000 - aggregateHeight * 0.5 - holes * 10 - bumpiness * 0.2
    );
  };

  const findBestPlacement = (
    board: number[][],
    piece: number[][],
    makeMistake: boolean = false
  ): { shape: number[][]; x: number; y: number } | null => {
    const rotations = getAllRotations(piece);
    const placements: Array<{
      shape: number[][];
      x: number;
      y: number;
      score: number;
    }> = [];

    rotations.forEach((rotatedPiece) => {
      for (let x = -rotatedPiece[0].length; x < 10; x++) {
        const y = dropPiece(board, rotatedPiece, x);
        if (canPlacePiece(board, rotatedPiece, x, y)) {
          const score = evaluatePlacement(board, rotatedPiece, x, y);
          placements.push({
            shape: rotatedPiece,
            x,
            y,
            score,
          });
        }
      }
    });

    if (placements.length === 0) return null;
    placements.sort((a, b) => b.score - a.score);

    if (makeMistake && placements.length > 1) {
      const mistakeRange = Math.max(1, Math.floor(placements.length * 0.7));
      const randomIndex = Math.floor(Math.random() * mistakeRange);
      return {
        shape: placements[randomIndex].shape,
        x: placements[randomIndex].x,
        y: placements[randomIndex].y,
      };
    }

    return {
      shape: placements[0].shape,
      x: placements[0].x,
      y: placements[0].y,
    };
  };

  const pieceColors = [
    { bg: "#00FFFF", border: "#00FFFF", shine: "rgba(255, 255, 255, 0.5)" },
    { bg: "#FFFF00", border: "#FFFF00", shine: "rgba(255, 255, 255, 0.5)" },
    { bg: "#C000FF", border: "#E000FF", shine: "rgba(255, 255, 255, 0.5)" },
    { bg: "#00FF00", border: "#00FF00", shine: "rgba(255, 255, 255, 0.5)" },
    { bg: "#FF0000", border: "#FF0000", shine: "rgba(255, 255, 255, 0.5)" },
    { bg: "#FF8800", border: "#FF8800", shine: "rgba(255, 255, 255, 0.5)" },
  ];

  const spawnPiece = () => {
    const pieceIndex = Math.floor(Math.random() * pieces.length);
    const randomPiece = pieces[pieceIndex];
    return {
      shape: randomPiece,
      x: Math.floor((10 - randomPiece[0].length) / 2),
      y: 0,
      pieceType: pieceIndex,
    };
  };

  useEffect(() => {
    setMounted(true);
    const newPiece = spawnPiece();
      const aiTarget = findBestPlacement(
        Array(20).fill(null).map(() => Array(10).fill(0)),
        newPiece.shape,
        Math.random() < 0.15
      );
    setGameState({
      board: Array(20).fill(null).map(() => Array(10).fill(0)),
      boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
      fallingPiece: newPiece,
      aiTarget: aiTarget || newPiece,
      flashingRows: [],
      isPaused: false,
    });
  }, []);

  const movePiece = (direction: 'left' | 'right' | 'down' | 'rotate') => {
    if (!isPlayerMode || !gameState.fallingPiece || isGameOver || countdown !== null || gameState.isPaused) return;
    setGameState((prev) => {
      const { board, fallingPiece } = prev;
      if (!fallingPiece) return prev;
      let updatedPiece = { ...fallingPiece };
      if (direction === 'left') {
        if (canPlacePiece(board, fallingPiece.shape, fallingPiece.x - 1, fallingPiece.y)) {
          updatedPiece.x = fallingPiece.x - 1;
        }
      } else if (direction === 'right') {
        if (canPlacePiece(board, fallingPiece.shape, fallingPiece.x + 1, fallingPiece.y)) {
          updatedPiece.x = fallingPiece.x + 1;
        }
      } else if (direction === 'down') {
        if (canPlacePiece(board, fallingPiece.shape, fallingPiece.x, fallingPiece.y + 1)) {
          updatedPiece.y = fallingPiece.y + 1;
        }
      } else if (direction === 'rotate') {
        const rotations = getAllRotations(fallingPiece.shape);
        const currentIndex = rotations.findIndex(
          (r) => JSON.stringify(r) === JSON.stringify(fallingPiece.shape)
        );
        const nextIndex = (currentIndex + 1) % rotations.length;
        const nextRotation = rotations[nextIndex];
        if (canPlacePiece(board, nextRotation, fallingPiece.x, fallingPiece.y)) {
          updatedPiece.shape = nextRotation;
        }
      }
      return { ...prev, fallingPiece: updatedPiece };
    });
  };

  useEffect(() => {
    if (!mounted || !isPlayerMode) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isGameOver || countdown !== null) return;
      setGameState((prev) => {
        if (prev.isPaused || !prev.fallingPiece) return prev;
        const { board, fallingPiece } = prev;
        if (!fallingPiece) return prev;
        let updatedPiece = { ...fallingPiece };
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (canPlacePiece(board, fallingPiece.shape, fallingPiece.x - 1, fallingPiece.y)) {
            updatedPiece.x = fallingPiece.x - 1;
          }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (canPlacePiece(board, fallingPiece.shape, fallingPiece.x + 1, fallingPiece.y)) {
            updatedPiece.x = fallingPiece.x + 1;
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (canPlacePiece(board, fallingPiece.shape, fallingPiece.x, fallingPiece.y + 1)) {
            updatedPiece.y = fallingPiece.y + 1;
          }
        } else if (e.key === 'ArrowUp' || e.key === ' ') {
          e.preventDefault();
          const rotations = getAllRotations(fallingPiece.shape);
          const currentIndex = rotations.findIndex(
            (r) => JSON.stringify(r) === JSON.stringify(fallingPiece.shape)
          );
          const nextIndex = (currentIndex + 1) % rotations.length;
          const nextRotation = rotations[nextIndex];
          if (canPlacePiece(board, nextRotation, fallingPiece.x, fallingPiece.y)) {
            updatedPiece.shape = nextRotation;
          }
        } else {
          return prev;
        }
        return { ...prev, fallingPiece: updatedPiece };
      });
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mounted, isPlayerMode, isGameOver, countdown]);

  useEffect(() => {
    if (!mounted || countdown !== null || isGameOver) return;
    const currentSpeed = Math.max(100, 400 - piecesSpawned * 2);
    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        const { board, boardPieceTypes, fallingPiece, aiTarget, isPaused, flashingRows } = prev;
        if (isPaused) {
          return prev;
        }
        const topRowHasBlocks = board[0].some((cell) => cell === 1);
        if (topRowHasBlocks && !isGameOver) {
          setIsGameOver(true);
          const gameOverBoard = Array(20).fill(null).map(() => Array(10).fill(0));
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 10; col++) {
              if (row < 5 && gameOverPattern.GG[row] && gameOverPattern.GG[row][col]) {
                gameOverBoard[8 + row][col] = 1;
              }
            }
          }
          setTimeout(() => {
            setCountdown(5);
          }, 2000);
          return {
            board: gameOverBoard,
            boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
            fallingPiece: null,
            aiTarget: null,
            flashingRows: [],
            isPaused: true,
          };
        }
        if (!fallingPiece) {
          const newPiece = spawnPiece();
          setPiecesSpawned((prev) => {
            const newCount = prev + 1;
            gameSpeedRef.current = Math.max(100, 400 - newCount * 2);
            return newCount;
          });
          const newAiTarget = isPlayerMode ? null : findBestPlacement(
            board,
            newPiece.shape,
            false
          );
          return {
            board,
            boardPieceTypes,
            fallingPiece: newPiece,
            aiTarget: newAiTarget || newPiece,
            flashingRows: [],
            isPaused: false,
          };
        }
        let updatedPiece = { ...fallingPiece };
        let shouldFall = true;
        if (!isPlayerMode && aiTarget) {
          const rotations = getAllRotations(fallingPiece.shape);
          const currentIndex = rotations.findIndex(
            (r) => JSON.stringify(r) === JSON.stringify(fallingPiece.shape)
          );
          const targetIndex = rotations.findIndex(
            (r) => JSON.stringify(r) === JSON.stringify(aiTarget.shape)
          );
          if (currentIndex !== targetIndex && currentIndex !== -1 && targetIndex !== -1) {
            const nextIndex = (currentIndex + 1) % rotations.length;
            const nextRotation = rotations[nextIndex];
            if (canPlacePiece(board, nextRotation, fallingPiece.x, fallingPiece.y)) {
              updatedPiece.shape = nextRotation;
              updatedPiece.pieceType = fallingPiece.pieceType;
              shouldFall = false;
            }
          }
          const isCorrectRotation = JSON.stringify(updatedPiece.shape) === JSON.stringify(aiTarget.shape);
          if (isCorrectRotation || fallingPiece.y < 10) {
            if (updatedPiece.x < aiTarget.x) {
              const newX = updatedPiece.x + 1;
              if (canPlacePiece(board, updatedPiece.shape, newX, updatedPiece.y)) {
                updatedPiece.x = newX;
                shouldFall = false;
              }
            } else if (updatedPiece.x > aiTarget.x) {
              const newX = updatedPiece.x - 1;
              if (canPlacePiece(board, updatedPiece.shape, newX, updatedPiece.y)) {
                updatedPiece.x = newX;
                shouldFall = false;
              }
            }
          }
        }
        const canMoveDown = updatedPiece.shape.every((row, dy) => {
          return row.every((cell, dx) => {
            if (!cell) return true;
            const newY = updatedPiece.y + dy + 1;
            const newX = updatedPiece.x + dx;
            if (newY >= 20) return false;
            if (newX < 0 || newX >= 10) return false;
            if (newY < 0) return true;
            return board[newY][newX] === 0;
          });
        });
        const finalPiece = updatedPiece;
        if (!isPlayerMode && finalPiece.y >= 10 && shouldFall && canMoveDown) {
          const droppedY = dropPiece(board, finalPiece.shape, finalPiece.x);
          return {
            board,
            boardPieceTypes,
            fallingPiece: { ...finalPiece, y: droppedY },
            aiTarget,
            flashingRows: [],
            isPaused: false,
          };
        }
        if (shouldFall && canMoveDown) {
          return {
            board,
            boardPieceTypes,
            fallingPiece: { ...finalPiece, y: finalPiece.y + 1 },
            aiTarget,
            flashingRows: [],
            isPaused: false,
          };
        } else if (!shouldFall) {
          return {
            board,
            boardPieceTypes,
            fallingPiece: finalPiece,
            aiTarget,
            flashingRows: [],
            isPaused: false,
          };
        } else {
          const newBoard = board.map((row) => [...row]);
          const newBoardPieceTypes = boardPieceTypes.map((row) => [...row]);
          finalPiece.shape.forEach((row, dy) => {
            row.forEach((cell, dx) => {
              if (cell) {
                const y = finalPiece.y + dy;
                const x = finalPiece.x + dx;
                if (y >= 0 && y < 20 && x >= 0 && x < 10) {
                  newBoard[y][x] = 1;
                  newBoardPieceTypes[y][x] = finalPiece.pieceType;
                }
              }
            });
          });
          const fullRows: number[] = [];
          for (let i = 0; i < 20; i++) {
            if (newBoard[i].every((cell) => cell === 1)) {
              fullRows.push(i);
            }
          }
          if (fullRows.length > 0) {
            setScore((prev) => prev + fullRows.length * 100);
            return {
              board: newBoard,
              boardPieceTypes: newBoardPieceTypes,
              fallingPiece: null,
              aiTarget: null,
              flashingRows: fullRows,
              isPaused: true,
            };
          }
          const newPiece = spawnPiece();
          setPiecesSpawned((prev) => {
            const newCount = prev + 1;
            gameSpeedRef.current = Math.max(100, 400 - newCount * 2);
            return newCount;
          });
          const newAiTarget = isPlayerMode ? null : findBestPlacement(
            newBoard,
            newPiece.shape,
            false
          );
          return {
            board: newBoard,
            boardPieceTypes: newBoardPieceTypes,
            fallingPiece: newPiece,
            aiTarget: newAiTarget || newPiece,
            flashingRows: [],
            isPaused: false,
          };
        }
      });
    }, currentSpeed);
    return () => clearInterval(gameLoop);
  }, [mounted, isPlayerMode, piecesSpawned, isGameOver, countdown]);

  useEffect(() => {
    isPlayerModeRef.current = isPlayerMode;
  }, [isPlayerMode]);

  useEffect(() => {
    if (!mounted || !isGameOver || countdown === null) return;
    
    const countdownBoard = Array(20).fill(null).map(() => Array(10).fill(0));
    const pattern = countdownPatterns[String(countdown)];
    if (pattern) {
      const startRow = 8;
      const startCol = countdown === 'GO' ? 1 : 3;
      for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row].length; col++) {
          if (pattern[row][col] === 1) {
            countdownBoard[startRow + row][startCol + col] = 1;
          }
        }
      }
    }
    setGameState(prev => {
      if (prev.fallingPiece !== null) {
        return {
          board: countdownBoard,
          boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
          fallingPiece: null,
          aiTarget: null,
          flashingRows: [],
          isPaused: true,
        };
      }
      if (JSON.stringify(prev.board) !== JSON.stringify(countdownBoard)) {
        return {
          board: countdownBoard,
          boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
          fallingPiece: null,
          aiTarget: null,
          flashingRows: [],
          isPaused: true,
        };
      }
      return prev;
    });

    if (countdown === 'GO') {
      const timeout = setTimeout(() => {
        setIsGameOver(false);
        setCountdown(null);
        setPiecesSpawned(0);
        setScore(0);
        gameSpeedRef.current = 400;
        const newPiece = spawnPiece();
        const currentMode = isPlayerModeRef.current;
        const aiTarget = currentMode ? null : findBestPlacement(
          Array(20).fill(null).map(() => Array(10).fill(0)),
          newPiece.shape,
          false
        );
        setGameState({
          board: Array(20).fill(null).map(() => Array(10).fill(0)),
          boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
          fallingPiece: newPiece,
          aiTarget: aiTarget || newPiece,
          flashingRows: [],
          isPaused: false,
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (countdown === 1) {
        setCountdown('GO');
      } else if (typeof countdown === 'number') {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [mounted, isGameOver, countdown]);

  useEffect(() => {
    if (!mounted) return;
    if (gameState.flashingRows.length > 0 && gameState.isPaused) {
      const timeout = setTimeout(() => {
        setGameState((prev) => {
          const { board, boardPieceTypes, flashingRows } = prev;
          const clearedBoard = board.map((row, index) => 
            flashingRows.includes(index) ? Array(10).fill(0) : row
          );
          const clearedPieceTypes = boardPieceTypes.map((row, index) =>
            flashingRows.includes(index) ? Array(10).fill(-1) : row
          );
          return {
            board: clearedBoard,
            boardPieceTypes: clearedPieceTypes,
            fallingPiece: prev.fallingPiece,
            aiTarget: prev.aiTarget,
            flashingRows: [],
            isPaused: true,
          };
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [gameState.flashingRows.length, gameState.isPaused, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const hasEmptyRowsWithBlocksAbove = gameState.board.some((row, rowIndex) => {
      if (!row.every(cell => cell === 0)) return false;
      return gameState.board.slice(0, rowIndex).some(r => r.some(c => c === 1));
    });
    
    if (gameState.flashingRows.length === 0 && gameState.isPaused && hasEmptyRowsWithBlocksAbove) {
      const timeout = setTimeout(() => {
        setGameState((prev) => {
          const { board, boardPieceTypes } = prev;
          const clearedBoard = board.filter((row) => !row.every(cell => cell === 0));
          const clearedPieceTypes = boardPieceTypes.filter((row, index) => 
            !board[index].every(cell => cell === 0)
          );
          while (clearedBoard.length < 20) {
            clearedBoard.unshift(Array(10).fill(0));
            clearedPieceTypes.unshift(Array(10).fill(-1));
          }
          const newPiece = spawnPiece();
          setPiecesSpawned((prev) => {
            const newCount = prev + 1;
            gameSpeedRef.current = Math.max(100, 400 - newCount * 2);
            return newCount;
          });
          const newAiTarget = isPlayerModeRef.current ? null : findBestPlacement(
            clearedBoard,
            newPiece.shape,
            false
          );
          return {
            board: clearedBoard,
            boardPieceTypes: clearedPieceTypes,
            fallingPiece: newPiece,
            aiTarget: newAiTarget || newPiece,
            flashingRows: [],
            isPaused: false,
          };
        });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [gameState.flashingRows.length, gameState.isPaused, mounted, gameState.board]);

  return (
    <div className="flex flex-col items-center">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rowDestroy {
          0% {
            background-color: #FFFF00;
            border-color: #FFFF00;
            opacity: 1;
            box-shadow: 0 0 0px rgba(255, 255, 255, 0);
          }
          35% {
            background-color: #00FFFF;
            border-color: #00FFFF;
            opacity: 1;
            box-shadow: 0 0 30px rgba(0, 255, 255, 1);
          }
          90% {
            background-color: #00FFFF;
            border-color: #00FFFF;
            opacity: 1;
            box-shadow: 0 0 30px rgba(0, 255, 255, 1);
          }
          95% {
            background-color: #FFFFFF;
            border-color: #FFFFFF;
            opacity: 1;
            box-shadow: 0 0 40px rgba(255, 255, 255, 1);
          }
          100% {
            background-color: #FFFFFF;
            border-color: #FFFFFF;
            opacity: 0;
            box-shadow: 0 0 0px rgba(255, 255, 255, 0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}} />
      <div className="relative p-4 bg-zinc-900/50 border border-zinc-700/50 rounded-lg backdrop-blur-sm">
        <div className="w-48 h-96 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 to-transparent pointer-events-none rounded" />
          <div className="grid grid-cols-10 gap-0.5 h-full p-1">
          {gameState.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isFallingPiece =
                gameState.fallingPiece &&
                gameState.fallingPiece.shape.some((r, dy) =>
                  r.some(
                    (c, dx) =>
                      c &&
                      gameState.fallingPiece!.y + dy === rowIndex &&
                      gameState.fallingPiece!.x + dx === colIndex
                  )
                );
              const isFlashingRow = gameState.flashingRows.includes(rowIndex);
              const isGameOverCell = isGameOver && countdown === null && (
                rowIndex >= 8 && rowIndex < 13 && gameOverPattern.GG[rowIndex - 8]?.[colIndex]
              );
              const isCountdownCell = countdown !== null && (() => {
                const pattern = countdownPatterns[String(countdown)];
                if (!pattern) return false;
                const startRow = 8;
                const startCol = countdown === 'GO' ? 1 : 3;
                const patternRow = rowIndex - startRow;
                const patternCol = colIndex - startCol;
                if (patternRow >= 0 && patternRow < pattern.length && 
                    patternCol >= 0 && patternCol < pattern[patternRow].length) {
                  return pattern[patternRow][patternCol] === 1;
                }
                return false;
              })();
              const pieceType = isFallingPiece
                ? gameState.fallingPiece!.pieceType
                : gameState.boardPieceTypes[rowIndex][colIndex];
              const colors =
                pieceType >= 0 && pieceType < pieceColors.length
                  ? pieceColors[pieceType]
                  : null;
              if (countdown !== null) {
                if (isCountdownCell) {
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="relative rounded-sm"
                      style={{
                        backgroundColor: countdown === 'GO' ? "#00FF00" : "#FFFF00",
                        border: `1px solid ${countdown === 'GO' ? "#00FF00" : "#FFFF00"}`,
                        boxShadow: `0 0 12px ${countdown === 'GO' ? "rgba(0, 255, 0, 0.9)" : "rgba(255, 255, 0, 0.9)"}, inset 0 0 8px rgba(255, 255, 255, 0.3)`,
                      }}
                    />
                  );
                }
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="bg-zinc-950/30 border border-zinc-800/40 rounded-sm transition-colors duration-75"
                  />
                );
              }
              if (isGameOver && countdown === null) {
                if (isGameOverCell) {
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="relative rounded-sm"
                      style={{
                        backgroundColor: "#FF0000",
                        border: "1px solid #FF0000",
                        boxShadow: "0 0 12px rgba(255, 0, 0, 0.9), inset 0 0 8px rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  );
                }
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="bg-zinc-950/30 border border-zinc-800/40 rounded-sm transition-colors duration-75"
                  />
                );
              }
              if (cell || isFallingPiece) {
                if (isFlashingRow) {
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="relative rounded-sm"
                      style={{
                        animation: 'rowDestroy 0.5s ease-in-out forwards',
                        border: "1px solid",
                      }}
                    />
                  );
                }
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`relative rounded-sm transition-all duration-75 ${isFallingPiece ? 'animate-pulse' : ''}`}
                    style={{
                      backgroundColor: colors?.bg || "#71717a",
                      border: `1px solid ${colors?.border || "#52525b"}`,
                      backgroundImage: colors
                        ? `radial-gradient(circle at 30% 30%, ${colors.shine} 0%, ${colors.shine} 40%, ${colors.bg} 60%, ${colors.bg} 100%)`
                        : undefined,
                      boxShadow: isFallingPiece
                        ? `0 0 8px ${colors?.bg || "#71717a"}40, inset -1px -1px 2px rgba(0, 0, 0, 0.5), inset 1px 1px 3px ${colors?.shine || "rgba(255, 255, 255, 0.3)"}`
                        : colors
                        ? `inset -1px -1px 3px rgba(0, 0, 0, 0.6), inset 1px 1px 4px ${colors.shine}, 0 1px 2px rgba(0, 0, 0, 0.3)`
                        : undefined,
                    }}
                  />
                );
              }
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="bg-zinc-950/30 border border-zinc-800/40 rounded-sm transition-colors duration-75"
                />
              );
            })
          )}
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3 w-48">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="text-zinc-400 text-xs font-mono uppercase tracking-wider">Score</span>
            <span className="text-zinc-100 text-lg font-mono font-semibold">{score.toLocaleString()}</span>
          </div>
          <button
            onClick={() => {
              const newMode = !isPlayerMode;
              setIsPlayerMode(newMode);
              isPlayerModeRef.current = newMode;
              if (countdown === null && !isGameOver) {
                setIsGameOver(true);
                const gameOverBoard = Array(20).fill(null).map(() => Array(10).fill(0));
                for (let row = 0; row < 5; row++) {
                  for (let col = 0; col < 10; col++) {
                    if (row < 5 && gameOverPattern.GG[row] && gameOverPattern.GG[row][col]) {
                      gameOverBoard[8 + row][col] = 1;
                    }
                  }
                }
                setGameState({
                  board: gameOverBoard,
                  boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
                  fallingPiece: null,
                  aiTarget: null,
                  flashingRows: [],
                  isPaused: true,
                });
                setTimeout(() => {
                  setCountdown(5);
                }, 2000);
              }
            }}
            className="px-4 py-2 text-xs font-semibold bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 border border-zinc-600/50 rounded-md transition-all duration-200 hover:border-zinc-500/50 hover:shadow-lg hover:shadow-zinc-900/50"
          >
            {isPlayerMode ? 'AI Mode' : 'Play'}
          </button>
        </div>
        <div className="pt-2 px-1 border-t border-zinc-700/50">
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-2">Controls</div>
          <div className="text-xs text-zinc-400 space-y-1.5 font-mono">
            <div className="flex justify-between"><span>← →</span><span className="text-zinc-500">Move</span></div>
            <div className="flex justify-between"><span>↓</span><span className="text-zinc-500">Soft Drop</span></div>
            <div className="flex justify-between"><span>↑ / Space</span><span className="text-zinc-500">Rotate</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
