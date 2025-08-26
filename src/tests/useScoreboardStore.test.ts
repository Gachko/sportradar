import { useScoreboardStore } from '../store/useScoreboardStore.tsx';

beforeEach(() => {
  useScoreboardStore.setState({ games: [] });
});

describe('useScoreboardStore', () => {
  it('startGame add game with init score', () => {
    const { startGame } = useScoreboardStore.getState();
    startGame('Milan', 'Inter');

    const { games } = useScoreboardStore.getState();
    expect(games).toHaveLength(1);
    expect(games[0].home).toBe('Milan');
    expect(games[0].away).toBe('Inter');
    expect(games[0].homeScore).toBe(0);
    expect(games[0].awayScore).toBe(0);
  });

  it('finishGame removes a game by id', () => {
    useScoreboardStore.setState({
      games: [
        { id: 1, home: 'Milan', away: 'Inter', homeScore: 0, awayScore: 0 },
        { id: 2, home: 'Real', away: 'Madrid', homeScore: 1, awayScore: 2 },
      ],
    });

    const { finishGame } = useScoreboardStore.getState();
    finishGame(2);

    const { games } = useScoreboardStore.getState();
    expect(games).toHaveLength(1);
    expect(games[0].id).toBe(1);
    expect(games[0]).toMatchObject({ home: 'Milan', away: 'Inter' });
  });
});
