import { Board } from '@pages/ScoreBoard/components';
import { useScoreboardStore } from '@store';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

it('opens Update dialog from an item and updates scores on confirm', async () => {
  const user = userEvent.setup();

  useScoreboardStore.setState({
    games: [
      { id: 1, home: 'Milan', away: 'Inter', homeScore: 0, awayScore: 0 },
      { id: 2, home: 'Real', away: 'Madrid', homeScore: 1, awayScore: 2 },
    ],
  });

  render(<Board />);

  const row = screen.getByText('Real').closest('li') as HTMLElement;
  const editBtn = within(row).getByLabelText(/edit/i);
  await user.click(editBtn);

  expect(screen.getByText(/update the game/i)).toBeInTheDocument();

  const homeInput = screen.getByLabelText('Real');
  const awayInput = screen.getByLabelText('Madrid');

  await user.clear(homeInput);
  await user.type(homeInput, '3');
  await user.clear(awayInput);
  await user.type(awayInput, '3');

  await user.click(screen.getByRole('button', { name: /update/i }));

  const { games } = useScoreboardStore.getState();
  const updated = games.find((g) => g.id === 2)!;
  expect(updated.homeScore).toBe(3);
  expect(updated.awayScore).toBe(3);

  expect(screen.queryByText(/update the game/i)).not.toBeInTheDocument();
});

it('closes Update dialog on Cancel without changing scores', async () => {
  const user = userEvent.setup();

  useScoreboardStore.setState({
    games: [{ id: 5, home: 'PSG', away: 'OM', homeScore: 2, awayScore: 1 }],
  });

  render(<Board />);

  const row = screen.getByText('PSG').closest('li') as HTMLElement;
  const editBtn = within(row).getByRole('button', { name: /edit/i });
  await user.click(editBtn);

  expect(screen.getByText(/update the game/i)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /cancel/i }));

  const { games } = useScoreboardStore.getState();
  expect(games[0]).toMatchObject({ id: 5, homeScore: 2, awayScore: 1 });

  expect(screen.queryByText(/update the game/i)).not.toBeInTheDocument();
});
