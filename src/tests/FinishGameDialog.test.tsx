import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FinishGameDialog } from '../pages/ScoreBoard/components/FinishGameDialog/FinishGameDialog';
import { useScoreboardStore } from '../store/useScoreboardStore.tsx';

beforeEach(() => {
  useScoreboardStore.setState({ games: [] });
});

describe('FinishGameDialog', () => {
  it('renders confirmation text and buttons when open', () => {
    const onClose = jest.fn();
    render(<FinishGameDialog open onClose={onClose} id={1} />);

    expect(screen.getByText(/finish a game/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to finish the game\?/i)).toBeInTheDocument();
    expect(screen.getByText(/the game will disappear from the scoreboard\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finish/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('on Finish: removes the game by id and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    useScoreboardStore.setState({
      games: [
        { id: 1, home: 'Milan', away: 'Madrid', homeScore: 0, awayScore: 0 },
        { id: 2, home: 'Real', away: 'Inter', homeScore: 1, awayScore: 2 },
      ],
    });

    render(<FinishGameDialog open onClose={onClose} id={2} />);

    await user.click(screen.getByRole('button', { name: /finish/i }));

    const { games } = useScoreboardStore.getState();
    expect(games).toHaveLength(1);
    expect(games[0].id).toBe(1);
    expect(onClose).toHaveBeenCalled();
  });

  it('on Cancel: does not change store and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    useScoreboardStore.setState({
      games: [{ id: 10, home: 'Barcelona', away: 'Juventus', homeScore: 0, awayScore: 0 }],
    });

    render(<FinishGameDialog open onClose={onClose} id={10} />);
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    const { games } = useScoreboardStore.getState();
    expect(games).toHaveLength(1);
    expect(onClose).toHaveBeenCalled();
  });
});
