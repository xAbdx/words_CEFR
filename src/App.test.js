import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders one card for every CEFR level in order', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Word cards' })).toBeInTheDocument();

  const cards = screen.getAllByRole('article');
  expect(cards).toHaveLength(6);

  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach((level, index) => {
    expect(within(cards[index]).getByText(level)).toBeInTheDocument();
  });
});

test('shows six cards from the selected CEFR level', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText('Choose a level'), {
    target: { value: 'B1' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Show 6 at level' }));

  const cards = screen.getAllByRole('article');
  expect(cards).toHaveLength(6);
  cards.forEach((card) => {
    expect(within(card).getByText('B1')).toBeInTheDocument();
  });
});
