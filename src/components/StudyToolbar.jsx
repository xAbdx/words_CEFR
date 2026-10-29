function StudyToolbar({
  levels,
  selectedLevel,
  onSelectedLevelChange,
  practiceLevel,
  onPracticeLevelChange,
  onShowCardsAtLevel,
  onShuffleCards,
}) {
  return (
    <div className="toolbar">
      <label className="filter-control">
        <span>Filter by level</span>
        <select
          value={selectedLevel}
          onChange={(event) => onSelectedLevelChange(event.target.value)}
        >
          <option value="all">All levels</option>
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </label>
      <div className="toolbar-actions">
        <label className="filter-control">
          <span>Choose a level</span>
          <select
            value={practiceLevel}
            onChange={(event) => onPracticeLevelChange(event.target.value)}
          >
            <option value="">Select level</option>
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </label>
        <button
          className="level-cards-button"
          type="button"
          onClick={onShowCardsAtLevel}
          disabled={!practiceLevel}
        >
          Show 6 at level
        </button>
        <button className="shuffle-button" type="button" onClick={onShuffleCards}>
          Shuffle cards
        </button>
      </div>
    </div>
  );
}

export default StudyToolbar;
