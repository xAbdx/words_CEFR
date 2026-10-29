function WordCard({ item, speechSupported, onSpeak }) {
  return (
    <article className="word-card">
      <div className="card-top">
        <span className="level-badge">{item.cefr_level}</span>
        <span className="part-of-speech">{item.part_of_speech}</span>
        {speechSupported && (
          <button
            type="button"
            className="pronunciation-button"
            onClick={() => onSpeak(item.word)}
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
  );
}

export default WordCard;
