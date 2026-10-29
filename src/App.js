import './App.css';
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import StudyToolbar from './components/StudyToolbar';
import ThemeToggle from './components/ThemeToggle';
import WordCardList from './components/WordCardList';
import useStudyCards from './hooks/useStudyCards';
import useTheme from './hooks/useTheme';
import { speak, speechSupported } from './utils/speech';

function App() {
  const {
    cardSetKey,
    levels,
    practiceLevel,
    selectedLevel,
    setPracticeLevel,
    setSelectedLevel,
    showCardsAtLevel,
    shuffleCards,
    visibleCards,
  } = useStudyCards();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`App${isDarkMode ? ' dark-mode' : ''}`}>
      <ThemeToggle
        isDarkMode={isDarkMode}
        onToggle={toggleDarkMode}
      />

      <AppHeader />

      <main className="study-area">
        <StudyToolbar
          levels={levels}
          selectedLevel={selectedLevel}
          onSelectedLevelChange={setSelectedLevel}
          practiceLevel={practiceLevel}
          onPracticeLevelChange={setPracticeLevel}
          onShowCardsAtLevel={showCardsAtLevel}
          onShuffleCards={shuffleCards}
        />
        <WordCardList
          cards={visibleCards}
          cardSetKey={cardSetKey}
          speechSupported={speechSupported}
          onSpeak={speak}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;