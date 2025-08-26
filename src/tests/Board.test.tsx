import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Board } from '../pages/ScoreBoard/components/Board/Board';
import { useScoreboardStore } from '../store/useScoreboardStore.tsx';

beforeEach(() => {
  useScoreboardStore.setState({ games: [] });
});

it('shows empty state when no games', () => {
  render(<Board />);
  expect(screen.getByText(/no games\./i)).toBeInTheDocument();
});

it('opens Finish dialog from an item and removes the game on confirm', async () => {
  const user = userEvent.setup();

  useScoreboardStore.setState({
    games: [
      { id: 1, home: 'Milan', away: 'Inter', homeScore: 0, awayScore: 0 },
      { id: 2, home: 'Real', away: 'Madrid', homeScore: 0, awayScore: 0 },
    ],
  });

  render(<Board />);

  const row = screen.getByText('Real').closest('li');
  expect(row).toBeInTheDocument();

  const finishBtn = within(row as HTMLElement).getByRole('button', { name: /finish/i });
  await user.click(finishBtn);

  expect(screen.getByText(/finish a game/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /finish/i }));

  const { games } = useScoreboardStore.getState();
  expect(games).toHaveLength(1);
  expect(games[0].id).toBe(1);

  expect(screen.queryByText(/finish a game/i)).not.toBeInTheDocument();
});
