import { useState } from 'react';
import './App.css';
import vocabulary from './vocabulary_600.json';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const speechSupported =
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  'SpeechSynthesisUtterance' in window;

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

function App() {
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

  function speak(text) {
    if (!speechSupported) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="App">
      <header className="app-header">
        <p className="eyebrow">Vocabulary practice</p>
        <h1>Word cards</h1>
        <p className="subtitle">Explore one word from every CEFR level.</p>
      </header>

      <main className="study-area">
        <div className="toolbar">
          <label className="filter-control">
            <span>Filter by level</span>
            <select
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
            >
              <option value="all">All levels</option>
              {LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>
          <div className="toolbar-actions">
            <label className="filter-control">
              <span>Choose a level</span>
              <select
                value={practiceLevel}
                onChange={(event) => setPracticeLevel(event.target.value)}
              >
                <option value="">Select level</option>
                {LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </label>
            <button
              className="level-cards-button"
              type="button"
              onClick={showCardsAtLevel}
              disabled={!practiceLevel}
            >
              Show 6 at level
            </button>
            <button className="shuffle-button" type="button" onClick={shuffleCards}>
              Shuffle cards
            </button>
          </div>
        </div>

        {visibleCards.length > 0 ? (
          <div className="card-grid" key={cardSetKey}>
            {visibleCards.map((item) => (
              <article className="word-card" key={`${item.word}-${item.cefr_level}`}>
                <div className="card-top">
                  <span className="level-badge">{item.cefr_level}</span>
                  <span className="part-of-speech">{item.part_of_speech}</span>
                  {speechSupported && (
                    <button
                      type="button"
                      className="pronunciation-button"
                      onClick={() => speak(item.word)}
                      aria-label={`Hear pronunciation of ${item.word}`}
                      title="Hear pronunciation"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                        <path d="M19 5a10 10 0 0 1 0 14" />
                      </svg>
                    </button>
                  )}
                </div>

                <h2>{item.word}</h2>
                <p className="definition">{item.definition}</p>

                <ul className="sentence-list">
                  {item.sentences.slice(0, 3).map((sentence, index) => (
                    <li key={`${item.word}-sentence-${index}`}>{sentence}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">No words are available for this level.</p>
        )}
      </main>

      <footer className="app-footer">
        <p className="footer-credit">
          Made with
          <svg
            aria-label="love"
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21s-7.2-4.35-9.6-9.06C.15 7.53 2.7 3 7.2 3c2.1 0 3.75 1.2 4.8 2.7C13.05 4.2 14.7 3 16.8 3c4.5 0 7.05 4.53 4.8 8.94C19.2 16.65 12 21 12 21Z" />
          </svg>
          by <span>Abd Salameh</span>
        </p>
        <a href="mailto:abd.salameeh@gmail.com">abd.salameeh@gmail.com</a>
      </footer>
    </div>
  );
}

export default App;
