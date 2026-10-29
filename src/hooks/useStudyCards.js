import { useState } from 'react';
import vocabulary from '../data/vocabulary_600.json';

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function shuffle(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

function createCards(level) {
  if (level) {
    const wordsAtLevel = vocabulary.filter((item) => item.cefr_level === level);
    return shuffle(wordsAtLevel).slice(0, 6);
  }

  return LEVELS.map((cefrLevel) => {
    const wordsAtLevel = vocabulary.filter((item) => item.cefr_level === cefrLevel);
    return wordsAtLevel[Math.floor(Math.random() * wordsAtLevel.length)];
  });
}

function useStudyCards() {
  const [cards, setCards] = useState(createCards);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [practiceLevel, setPracticeLevel] = useState('');
  const [cardSetKey, setCardSetKey] = useState(0);

  const visibleCards =
    selectedLevel === 'all'
      ? cards
      : cards.filter((item) => item.cefr_level === selectedLevel);

  function shuffleCards() {
    setCards(createCards());
    setCardSetKey((key) => key + 1);
  }

  function showCardsAtLevel() {
    setCards(createCards(practiceLevel));
    setSelectedLevel('all');
    setCardSetKey((key) => key + 1);
  }

  return {
    cardSetKey,
    levels: LEVELS,
    practiceLevel,
    selectedLevel,
    setPracticeLevel,
    setSelectedLevel,
    showCardsAtLevel,
    shuffleCards,
    visibleCards,
  };
}

export default useStudyCards;
