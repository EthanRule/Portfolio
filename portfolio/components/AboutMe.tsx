"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutMe() {
  const [mounted, setMounted] = useState(false);
  const [gameState, setGameState] = useState<{
    board: number[][];
    boardPieceTypes: number[][]; // Track which piece type is in each cell
    fallingPiece: { shape: number[][]; x: number; y: number; pieceType: number } | null;
    aiTarget: { shape: number[][]; x: number; y: number } | null;
    flashingRows: number[]; // Rows that are about to be cleared (flashing yellow)
    isPaused: boolean; // Pause game during row clear animation
  }>({
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
    fallingPiece: null,
    aiTarget: null,
    flashingRows: [],
    isPaused: false,
  });

  // Tetris pieces (simplified shapes)
  const pieces = [
    [[1, 1, 1, 1]], // I-piece
    [[1, 1], [1, 1]], // O-piece
    [[0, 1, 0], [1, 1, 1]], // T-piece
    [[1, 1, 0], [0, 1, 1]], // S-piece
    [[0, 1, 1], [1, 1, 0]], // Z-piece
  ];

  // Rotate a piece 90 degrees clockwise
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

  // Get all rotations of a piece
  const getAllRotations = (piece: number[][]): number[][][] => {
    const rotations = [piece];
    let current = piece;
    for (let i = 0; i < 3; i++) {
      current = rotatePiece(current);
      // Check if rotation is unique
      const isUnique = !rotations.some(
        (r) => JSON.stringify(r) === JSON.stringify(current)
      );
      if (isUnique) {
        rotations.push(current);
      } else {
        break; // No more unique rotations
      }
    }
    return rotations;
  };

  // Check if piece can be placed at position
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

  // Drop piece to lowest valid position
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

  // Simulate placing piece and evaluate the result
  const evaluatePlacement = (
    board: number[][],
    piece: number[][],
    x: number,
    y: number
  ): number => {
    const newBoard = board.map((row) => [...row]);
    
    // Place the piece
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

    // Count lines cleared
    const linesCleared = newBoard.filter((row) =>
      row.every((cell) => cell === 1)
    ).length;

    // Calculate aggregate height (sum of highest block in each column)
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

    // Count holes (empty cells with filled cells above)
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

    // Calculate bumpiness (sum of differences between adjacent column heights)
    let bumpiness = 0;
    for (let i = 0; i < 9; i++) {
      bumpiness += Math.abs(columnHeights[i] - columnHeights[i + 1]);
    }

    // Score: higher is better (lines cleared is most important, then minimize negatives)
    return (
      linesCleared * 1000 - aggregateHeight * 0.5 - holes * 10 - bumpiness * 0.2
    );
  };

  // AI: Find best placement (with occasional mistakes)
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

    // Sort by score (best first)
    placements.sort((a, b) => b.score - a.score);

    // 15% chance to make a mistake and choose a suboptimal placement
    if (makeMistake && placements.length > 1) {
      // Choose from top 70% of placements (not the absolute best)
      const mistakeRange = Math.max(1, Math.floor(placements.length * 0.7));
      const randomIndex = Math.floor(Math.random() * mistakeRange);
      return {
        shape: placements[randomIndex].shape,
        x: placements[randomIndex].x,
        y: placements[randomIndex].y,
      };
    }

    // Return best placement
    return {
      shape: placements[0].shape,
      x: placements[0].x,
      y: placements[0].y,
    };
  };

  // Identify piece type from shape
  const identifyPieceType = (shape: number[][]): number => {
    const shapeStr = JSON.stringify(shape);
    for (let i = 0; i < pieces.length; i++) {
      const rotations = getAllRotations(pieces[i]);
      if (rotations.some((r) => JSON.stringify(r) === shapeStr)) {
        return i;
      }
    }
    return 0; // Default to I-piece
  };

  // Tetris piece colors (brighter, more vibrant)
  const pieceColors = [
    { bg: "#00FFFF", border: "#00FFFF", shine: "rgba(255, 255, 255, 0.5)" }, // I-piece: Cyan
    { bg: "#FFFF00", border: "#FFFF00", shine: "rgba(255, 255, 255, 0.5)" }, // O-piece: Yellow
    { bg: "#C000FF", border: "#E000FF", shine: "rgba(255, 255, 255, 0.5)" }, // T-piece: Purple
    { bg: "#00FF00", border: "#00FF00", shine: "rgba(255, 255, 255, 0.5)" }, // S-piece: Green
    { bg: "#FF0000", border: "#FF0000", shine: "rgba(255, 255, 255, 0.5)" }, // Z-piece: Red
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

  // Only initialize game on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const newPiece = spawnPiece();
    const aiTarget = findBestPlacement(
      Array(20).fill(null).map(() => Array(10).fill(0)),
      newPiece.shape,
      Math.random() < 0.15 // 15% chance to make a mistake
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

  useEffect(() => {
    // Only run game loop on client side
    if (!mounted) return;
    
    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        const { board, boardPieceTypes, fallingPiece, aiTarget, isPaused, flashingRows } = prev;
        
        // If paused (row clearing animation), don't update game state
        if (isPaused) {
          return prev;
        }
        
        // Check for game over (stack reached top)
        const topRowHasBlocks = board[0].some((cell) => cell === 1);
        if (topRowHasBlocks) {
          // Reset game
          const newPiece = spawnPiece();
          const newAiTarget = findBestPlacement(
            Array(20).fill(null).map(() => Array(10).fill(0)),
            newPiece.shape,
            Math.random() < 0.15
          );
          return {
            board: Array(20).fill(null).map(() => Array(10).fill(0)),
            boardPieceTypes: Array(20).fill(null).map(() => Array(10).fill(-1)),
            fallingPiece: newPiece,
            aiTarget: newAiTarget || newPiece,
            flashingRows: [],
            isPaused: false,
          };
        }

        if (!fallingPiece) {
          const newPiece = spawnPiece();
          const newAiTarget = findBestPlacement(
            board,
            newPiece.shape,
            Math.random() < 0.15
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

        // AI: Move piece towards target position/rotation as it falls
        let updatedPiece = { ...fallingPiece };
        let shouldFall = true;

        if (aiTarget) {
          // Priority 1: Rotate to target rotation (do this early, when piece is at top)
          const rotations = getAllRotations(fallingPiece.shape);
          const currentIndex = rotations.findIndex(
            (r) => JSON.stringify(r) === JSON.stringify(fallingPiece.shape)
          );
          const targetIndex = rotations.findIndex(
            (r) => JSON.stringify(r) === JSON.stringify(aiTarget.shape)
          );
          
          if (currentIndex !== targetIndex && currentIndex !== -1 && targetIndex !== -1) {
            // Rotate towards target (one step at a time)
            const nextIndex = (currentIndex + 1) % rotations.length;
            const nextRotation = rotations[nextIndex];
            // Check if rotation is valid at current position
            if (canPlacePiece(board, nextRotation, fallingPiece.x, fallingPiece.y)) {
              updatedPiece.shape = nextRotation;
              // Keep the same pieceType when rotating
              updatedPiece.pieceType = fallingPiece.pieceType;
              shouldFall = false; // Don't fall this frame if we're rotating
            }
          }

          // Priority 2: Move horizontally towards target (only if rotation is correct or close)
          const isCorrectRotation = JSON.stringify(updatedPiece.shape) === JSON.stringify(aiTarget.shape);
          if (isCorrectRotation || fallingPiece.y < 10) {
            if (updatedPiece.x < aiTarget.x) {
              const newX = updatedPiece.x + 1;
              if (canPlacePiece(board, updatedPiece.shape, newX, updatedPiece.y)) {
                updatedPiece.x = newX;
                shouldFall = false; // Don't fall this frame if we're moving horizontally
              }
            } else if (updatedPiece.x > aiTarget.x) {
              const newX = updatedPiece.x - 1;
              if (canPlacePiece(board, updatedPiece.shape, newX, updatedPiece.y)) {
                updatedPiece.x = newX;
                shouldFall = false; // Don't fall this frame if we're moving horizontally
              }
            }
          }
        }

        // Check if piece can move down (using updated piece position/rotation)
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

        // Update falling piece with new position/rotation
        const finalPiece = updatedPiece;

        // If piece is past halfway point (row 10), drop it all the way down
        if (finalPiece.y >= 10 && shouldFall && canMoveDown) {
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
          // Just update position/rotation without falling
          return {
            board,
            boardPieceTypes,
            fallingPiece: finalPiece,
            aiTarget,
            flashingRows: [],
            isPaused: false,
          };
        } else {
          // Piece landed, lock it in place (use finalPiece which has the updated position/rotation)
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

          // Find full rows that need to be cleared
          const fullRows: number[] = [];
          for (let i = 0; i < 20; i++) {
            if (newBoard[i].every((cell) => cell === 1)) {
              fullRows.push(i);
            }
          }

          // If there are full rows, pause and flash them
          if (fullRows.length > 0) {
            return {
              board: newBoard,
              boardPieceTypes: newBoardPieceTypes,
              fallingPiece: null,
              aiTarget: null,
              flashingRows: fullRows,
              isPaused: true,
            };
          }

          // No full rows, spawn new piece
          const newPiece = spawnPiece();
          const newAiTarget = findBestPlacement(
            newBoard,
            newPiece.shape,
            Math.random() < 0.15 // 15% chance to make a mistake
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
    }, 400); // Update every 400ms for natural falling speed

    return () => clearInterval(gameLoop);
  }, [mounted]);

  // Handle row clearing animation
  useEffect(() => {
    if (!mounted) return;
    
    if (gameState.flashingRows.length > 0 && gameState.isPaused) {
      const timeout = setTimeout(() => {
        setGameState((prev) => {
          const { board, boardPieceTypes, flashingRows } = prev;
          
          // Clear the flashing rows
          const clearedBoard = board.filter(
            (row, index) => !flashingRows.includes(index)
          );
          const clearedPieceTypes = boardPieceTypes.filter(
            (row, index) => !flashingRows.includes(index)
          );
          
          // Add empty rows at the top
          while (clearedBoard.length < 20) {
            clearedBoard.unshift(Array(10).fill(0));
            clearedPieceTypes.unshift(Array(10).fill(-1));
          }

          // Spawn new piece
          const newPiece = spawnPiece();
          const newAiTarget = findBestPlacement(
            clearedBoard,
            newPiece.shape,
            Math.random() < 0.15
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
      }, 1000); // Wait 1 second before clearing

      return () => clearTimeout(timeout);
    }
  }, [gameState.flashingRows, gameState.isPaused, mounted]);

  return (
    <section id="about" className="pt-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
      {/* Tetris Sidebar */}
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <div className="absolute top-1/4 right-16 lg:right-24 xl:right-32 w-48 h-96">
          <div className="grid grid-cols-10 gap-0.5 h-full">
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
                const pieceType = isFallingPiece
                  ? gameState.fallingPiece!.pieceType
                  : gameState.boardPieceTypes[rowIndex][colIndex];

                const colors =
                  pieceType >= 0 && pieceType < pieceColors.length
                    ? pieceColors[pieceType]
                    : null;

                if (cell || isFallingPiece) {
                  // If this row is flashing, make it yellow
                  if (isFlashingRow) {
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="relative transition-colors duration-75"
                        style={{
                          backgroundColor: "#FFFF00",
                          border: "1px solid #FFFF00",
                          backgroundImage: "radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 30%, #FFFF00 50%, #FFFF00 100%)",
                          boxShadow: "inset -1px -1px 2px rgba(0, 0, 0, 0.3), inset 1px 1px 3px rgba(255, 255, 255, 0.6)",
                        }}
                      />
                    );
                  }

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="relative transition-colors duration-75"
                      style={{
                        backgroundColor: colors?.bg || "#71717a",
                        border: `1px solid ${colors?.border || "#52525b"}`,
                        backgroundImage: colors
                          ? `radial-gradient(circle at 70% 70%, ${colors.shine} 0%, ${colors.shine} 30%, ${colors.bg} 50%, ${colors.bg} 100%)`
                          : undefined,
                        boxShadow: colors
                          ? `inset -1px -1px 2px rgba(0, 0, 0, 0.4), inset 1px 1px 3px ${colors.shine}`
                          : undefined,
                      }}
                    />
                  );
                }

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="bg-transparent border border-zinc-800 transition-colors duration-75"
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="space-y-6">
            <p className="text-zinc-300 leading-relaxed">
              Hi, I'm Ethan. I'm a game developer who's passionate about
              building immersive experiences with Unreal Engine and C++. I
              specialize in systems programming, gameplay mechanics, and
              performance optimization, bringing ideas to life through code
              and creative problem-solving.
            </p>
          </div>

          {/* Gaming Background */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">
              Gaming Backgr
              <span>o</span>
              <span style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.15), 1px 1px 2px rgba(255, 255, 255, 0.18)" }}>u</span>
              <span style={{ textShadow: "0 0 6px rgba(255, 255, 255, 0.2), 1px 1px 3px rgba(255, 255, 255, 0.22)" }}>n</span>
              <span style={{ textShadow: "0 0 7px rgba(255, 255, 255, 0.25), 1px 1px 3px rgba(255, 255, 255, 0.28)" }}>d</span>
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              My passion for games runs deep. I've played professional World of
              Warcraft PvP as a Balance Druid one-trick, hitting rank 1 (top 0.1%)
              for nine seasons and holding the{" "}
              <Link
                href="https://check-pvp.fr/us/Sargeras/Rudar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-bold hover:text-blue-300"
              >
                highest solo shuffle experience in North America
              </Link>
              . I'm also Diamond on Brawlhalla and Emerald in League of Legends
              (I think I could hit Masters, but Neace might say otherwise). My
              first game was Lego Star Wars, where I completed the stud fountain,
              and my favorite racing game is Sonic & Sega All-Stars Racing. This
              lifelong love of gaming has naturally evolved into a passion for
              creating games myself.
            </p>
          </div>

          {/* Education & Learning */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">
              Education & Learning
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              My journey in game development has been driven by a deep
              fascination with interactive systems and the technical challenges
              of creating engaging gameplay. During college, I focused on the
              C/C++ computer science track for three years, building a strong
              foundation in systems programming, before transitioning to Python
              in my final year for AI and machine learning. This background
              gave me a solid understanding of low-level programming and
              performance optimization, which I now apply to game development.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              I enjoy diving deep into Unreal Engine's architecture, working
              with Blueprints and C++ to build robust game systems, and
              constantly exploring new game mechanics while studying industry
              best practices. To stay sharp and continue growing, I practice
              LeetCode daily and work through an Unreal Engine C++ course to
              ensure I'm learning the proper ways of game development.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Beyond programming, I'm also skilled in content creation tools
              like Premiere Pro and Photoshop, which I use to produce and edit
              gaming content. I've built a community of over 13,000 followers
              on Twitch and more than 4,000 subscribers on YouTube, where I
              share gameplay, tutorials, and insights into Balance Druid PvP.
            </p>
          </div>

          {/* Current Work */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">
              Current Work
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Putting this knowledge into practice, I'm currently working on{" "}
              <span className="text-blue-400 font-bold">Box Survivor</span>, a
              vampire survivors-style game that will be my first published
              title. This project is one of three games I'm building as part
              of my portfolio to land my first game developer job, each
              showcasing different aspects of game development and my growing
              expertise with Unreal Engine and C++.
            </p>
          </div>

          {/* Career Goals */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">
              Career Goals
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              My goal is to work for industry-leading game studios where I can
              contribute to creating memorable gaming experiences. I'm
              particularly interested in opportunities at{" "}
              <Link
                href="https://www.riotgames.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 font-bold hover:text-red-400"
              >
                Riot Games
              </Link>
              ,{" "}
              <Link
                href="https://www.blizzard.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:text-blue-500"
              >
                Blizzard
              </Link>
              ,{" "}
              <Link
                href="https://www.bluemammothgames.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 font-bold hover:text-blue-200"
              >
                Blue Mammoth Games
              </Link>
              ,{" "}
              <Link
                href="https://www.ea.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 font-bold hover:text-red-400"
              >
                Electronic Arts
              </Link>
              ,{" "}
              <Link
                href="https://www.sega.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-bold hover:text-blue-300"
              >
                Sega
              </Link>
              , and{" "}
              <Link
                href="https://www.lucasfilm.com/games"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 font-bold hover:text-gray-300"
                style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.3)" }}
              >
                Lucasfilm Games
              </Link>
              . My ultimate goal is to work on a team of talented game developers
              within these companies, collaborating to create experiences that
              players will remember for years to come.
            </p>
          </div>

          {/* Projects Transition */}
          <div className="space-y-6">
            <p className="text-zinc-300 leading-relaxed">
              Below are some of my previous projects that have given me a broad
              range of software engineering experience across different domains.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
