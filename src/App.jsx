import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [keyword, setKeyword] = useState('');
  const [keywordPosition, setKeywordPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const keywords = ['HIT', 'MISS', 'SCORE', 'GAME', 'OVER'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(intervalId);
        setGameOver(true);
      }
    }, 1000);

    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    const randomPosition = Math.floor(Math.random() * 9);
    setKeyword(randomKeyword);
    setKeywordPosition(randomPosition);

    const timeoutId = setTimeout(() => {
      setKeyword('');
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [timeLeft, keywords]);

  const handleBoxClick = (index) => {
    if (index === keywordPosition) {
      setScore(score + 5);
    } else {
      setScore(score - 2.5);
    }
  };

  return (
    <div className="game">
      <div className="score">Score: {score}</div>
      <div className="timer">Time Left: {timeLeft}</div>
      <div className="grid">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`box ${index === keywordPosition && keyword ? 'active' : ''}`}
            onClick={() => handleBoxClick(index)}
          >
            {index === keywordPosition && keyword}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">Game Over! Your final score is: {score}</div>
      )}
    </div>
  );
};

export default App;