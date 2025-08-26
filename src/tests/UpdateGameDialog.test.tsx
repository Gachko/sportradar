import { UpdateGameDialog } from '@pages/ScoreBoard/components/UpdateGameDialog/UpdateGameDialog';
import { useScoreboardStore } from '@store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Game } from '@types';

const setupStore = (games: Game[]) => useScoreboardStore.setState({ games });

beforeEach(() => {
  setupStore([]);
  jest.restoreAllMocks();
});

it('renders with team labels and initial values', () => {
  const game = { id: 42, home: 'Real', away: 'Madrid', homeScore: 1, awayScore: 2 };
  setupStore([game]);

  render(<UpdateGameDialog open onClose={jest.fn()} game={game} />);

  const home = screen.getByLabelText('Real') as HTMLInputElement;
  const away = screen.getByLabelText('Madrid') as HTMLInputElement;
  expect(home.value).toBe('1');
  expect(away.value).toBe('2');
  expect(screen.getByText(/update the game/i)).toBeInTheDocument();
});

it('shows "required" errors on empty fields and does not update', async () => {
  const user = userEvent.setup();
  const game = { id: 10, home: 'Milan', away: 'Real', homeScore: 0, awayScore: 1 };
  setupStore([game]);

  const onClose = jest.fn();
  render(<UpdateGameDialog open onClose={onClose} game={game} />);

  const home = screen.getByLabelText('Milan') as HTMLInputElement;
  const away = screen.getByLabelText('Real') as HTMLInputElement;

  await user.clear(home);
  await user.clear(away);
  await user.click(screen.getByRole('button', { name: /update/i }));

  expect(screen.getByText(/milan is required/i)).toBeInTheDocument();
  expect(screen.getByText(/real is required/i)).toBeInTheDocument();

  const { games } = useScoreboardStore.getState();
  expect(games[0]).toMatchObject({ homeScore: 0, awayScore: 1 });
  expect(onClose).not.toHaveBeenCalled();
});

it('invalid numbers (negative/decimal) do not update and do not close', async () => {
  const user = userEvent.setup();
  const game = { id: 11, home: 'Milan', away: 'Real', homeScore: 2, awayScore: 1 };
  setupStore([game]);

  const onClose = jest.fn();
  render(<UpdateGameDialog open onClose={onClose} game={game} />);

  const home = screen.getByLabelText('Milan') as HTMLInputElement;
  const away = screen.getByLabelText('Real') as HTMLInputElement;

  await user.clear(home);
  await user.type(home, '-1');
  await user.clear(away);
  await user.type(away, '1.5');
  await user.click(screen.getByRole('button', { name: /update/i }));

  const { games } = useScoreboardStore.getState();
  expect(games[0]).toMatchObject({ homeScore: 2, awayScore: 1 });
  expect(onClose).not.toHaveBeenCalled();
});

it('updates scores on valid submit and calls onClose', async () => {
  const user = userEvent.setup();
  const game = { id: 12, home: 'Milan', away: 'Real', homeScore: 0, awayScore: 0 };
  setupStore([game]);

  const onClose = jest.fn();
  render(<UpdateGameDialog open onClose={onClose} game={game} />);

  const home = screen.getByLabelText('Milan') as HTMLInputElement;
  const away = screen.getByLabelText('Real') as HTMLInputElement;

  await user.clear(home);
  await user.type(home, '3');
  await user.clear(away);
  await user.type(away, '2');
  await user.click(screen.getByRole('button', { name: /update/i }));

  const { games } = useScoreboardStore.getState();
  expect(games[0]).toMatchObject({ homeScore: 3, awayScore: 2 });
  expect(onClose).toHaveBeenCalled();
});

it('syncs form when game prop changes (rerender)', async () => {
  const game1 = { id: 20, home: 'Milan', away: 'Real', homeScore: 1, awayScore: 1 };
  const game2 = { id: 21, home: 'Barcelona', away: 'Juventus', homeScore: 4, awayScore: 5 };
  setupStore([game1, game2]);

  const { rerender } = render(<UpdateGameDialog open onClose={jest.fn()} game={game1} />);

  expect((screen.getByLabelText('Milan') as HTMLInputElement).value).toBe('1');
  expect((screen.getByLabelText('Real') as HTMLInputElement).value).toBe('1');

  rerender(<UpdateGameDialog open onClose={jest.fn()} game={game2} />);

  expect((screen.getByLabelText('Barcelona') as HTMLInputElement).value).toBe('4');
  expect((screen.getByLabelText('Juventus') as HTMLInputElement).value).toBe('5');
});

it('calls onClose on Cancel', async () => {
  const user = userEvent.setup();
  const game = { id: 30, home: 'Milan', away: 'Madrid', homeScore: 0, awayScore: 0 };
  setupStore([game]);

  const onClose = jest.fn();
  render(<UpdateGameDialog open onClose={onClose} game={game} />);

  await user.click(screen.getByRole('button', { name: /cancel/i }));
  expect(onClose).toHaveBeenCalled();
});
