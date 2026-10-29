import WordCard from './WordCard';

function WordCardList({ cards, cardSetKey, speechSupported, onSpeak }) {
  if (cards.length === 0) {
    return <p className="empty-state">No words are available for this level.</p>;
  }

  return (
    <div className="card-grid" key={cardSetKey}>
      {cards.map((item) => (
        <WordCard
          key={`${item.word}-${item.cefr_level}`}
          item={item}
          speechSupported={speechSupported}
          onSpeak={onSpeak}
        />
      ))}
    </div>
  );
}

export default WordCardList;
