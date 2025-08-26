import { useScoreboardStore } from '@store';

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

  it('updateGame by id and save links to another elements', () => {
    const g1 = { id: 1, home: 'Milan', away: 'Inter', homeScore: 0, awayScore: 0 };
    const g2 = { id: 2, home: 'Real', away: 'Madrid', homeScore: 1, awayScore: 2 };
    useScoreboardStore.setState({ games: [g1, g2] });

    const updated = { ...g2, homeScore: 3, awayScore: 3 };
    useScoreboardStore.getState().updateGame(updated);

    const { games } = useScoreboardStore.getState();
    expect(games).toHaveLength(2);

    const game2 = games.find((g) => g.id === 2)!;
    expect(game2).toMatchObject({ homeScore: 3, awayScore: 3 });

    const game1 = games.find((g) => g.id === 1)!;
    expect(game1).toBe(g1);
  });

  it('updateGame with non-existent id does not change the content', () => {
    useScoreboardStore.setState({
      games: [{ id: 7, home: 'Milan', away: 'Madrid', homeScore: 0, awayScore: 0 }],
    });

    const before = JSON.parse(JSON.stringify(useScoreboardStore.getState().games));
    useScoreboardStore.getState().updateGame({
      id: 999,
      home: 'Milan',
      away: 'Madrid',
      homeScore: 5,
      awayScore: 5,
    });

    const { games } = useScoreboardStore.getState();
    expect(games).toEqual(before);
  });
});

it('getSummaryGames sorts by total score desc and by recency when totals are equal', () => {
  useScoreboardStore.setState({
    games: [
      { id: 1, home: 'Mexico', away: 'Canada', homeScore: 0, awayScore: 5 },
      { id: 2, home: 'Spain', away: 'Brazil', homeScore: 10, awayScore: 2 },
      { id: 3, home: 'Germany', away: 'France', homeScore: 2, awayScore: 2 },
      { id: 4, home: 'Uruguay', away: 'Italy', homeScore: 6, awayScore: 6 },
      { id: 5, home: 'Argentina', away: 'Australia', homeScore: 3, awayScore: 1 },
    ],
  });

  const { getSummaryGames, games: original } = useScoreboardStore.getState();
  const summary = getSummaryGames();

  expect(summary.map((g) => g.id)).toEqual([4, 2, 1, 5, 3]);
  expect(summary).not.toBe(original);
});

it('getSummaryGames keeps order by recency for equal totals (larger id first)', () => {
  useScoreboardStore.setState({
    games: [
      { id: 100, home: 'Mexico', away: 'Canada', homeScore: 2, awayScore: 2 },
      { id: 200, home: 'Spain', away: 'Brazil', homeScore: 2, awayScore: 2 },
      { id: 150, home: 'Uruguay', away: 'Italy', homeScore: 0, awayScore: 1 },
    ],
  });

  const { getSummaryGames } = useScoreboardStore.getState();
  const summary = getSummaryGames();

  expect(summary.map((g) => g.id)).toEqual([200, 100, 150]);
});
