'use client';

import { useEffect, useMemo, useState } from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { ColorModifier, GameState, HSLColor } from "../types";
import { calculateMinimumRequiredMoves, generateRandomColorHSL, hslToString, ColorModifications } from "../lib/utils";
import { MAX_MOVES, MIN_MOVES, USER_EXTRA_MOVIES_ALLOWED } from "../constants";
import { Button } from "./ui/button";

export default function ColorMatchingGame() {
  const { width, height } = useWindowSize()
  const [gameLoading, setGameLoading] = useState(true)
  const [gameState, setGameState] = useState<GameState>("playing")
  const [sourceHsl, setSourceHsl] = useState<HSLColor>()
  const [targetHsl, setTargetHsl] = useState<HSLColor>()
  const [maxMovesAllowed, setMaxMovesAllowed] = useState(0)

  const gameStarted = useMemo(() => sourceHsl && targetHsl, [sourceHsl, targetHsl])

  const resetGame = () => {
    setSourceHsl(undefined)
    setTargetHsl(undefined)
    setMaxMovesAllowed(0)
    setGameState("playing")
  }

  const checkGameState: (moves?: number) => GameState = (moves) => {
    const m = moves ?? maxMovesAllowed
    if (m === 0) {
      return "lost"
    }
    if (hslToString(sourceHsl!) === hslToString(targetHsl!)) {
      return "won"
    }
    return "playing"
  }

  const startGame = () => {
    const source = generateRandomColorHSL()
    const target = generateRandomColorHSL()
    const moves = calculateMinimumRequiredMoves(source, target)

    if (moves < MIN_MOVES || moves > MAX_MOVES - USER_EXTRA_MOVIES_ALLOWED) {
      startGame()
    }

    const maxMoves = moves + USER_EXTRA_MOVIES_ALLOWED
    setSourceHsl(source)
    setTargetHsl(target)
    setMaxMovesAllowed(maxMoves)
    setGameState("playing")
  }

  const handleMove = (modifier: ColorModifier) => {
    if ((gameState !== "playing") || (!sourceHsl || !targetHsl)) {
      return
    }

    const newHsl = modifier(sourceHsl)
    const moves = maxMovesAllowed - 1
    const state = checkGameState(moves)

    if (state === "playing") {
      setSourceHsl(newHsl)
      setMaxMovesAllowed(moves)
    } else {
      setGameState(state)
    }
  }

  useEffect(() => {
    setGameLoading(true)
    resetGame()
    startGame()
    setGameLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!gameStarted) {
    return null
  }

  if (gameLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-row w-80 justify-evenly mb-4 mx-auto">
        <div>
          <div className="w-20 h-20 rounded-full" style={{ backgroundColor: hslToString(sourceHsl!) }} />
        </div>
        <div>
          <div className="w-20 h-20 rounded-full" style={{ backgroundColor: hslToString(targetHsl!) }} />
        </div>

      </div>
      <div className="text-center mb-8">
        <p
          className={`text-lg font-bold ${gameState === 'playing' ? 'invisible' : 'visible'}`}
        >
          You {gameState}!
        </p>
        <p className="text-lg">Moves left: {maxMovesAllowed}</p>
      </div>
      {/* have a 2x3 grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-8">
        {
          Object.entries(ColorModifications).map(([key, { label, modifier }]) => {
            return (
              <Button key={key} onClick={() => handleMove(modifier)} disabled={gameState !== 'playing'} className="w-full">
                {label}
              </Button>
            )
          })
        }
      </div>
      <div>
        <Button
          onClick={() => {
            resetGame()
            startGame()
          }}
          className="w-full"
        >
          New Game
        </Button>
      </div>
      {
        gameState === "won" &&
        <Confetti
          width={width}
          height={height}
          recycle={false}
        />
      }
    </div>
  )
}
