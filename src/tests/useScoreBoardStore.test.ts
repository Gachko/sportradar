import { useScoreBoardStore } from '../store/useScoreBoardStore';

beforeEach(() => {
  useScoreBoardStore.setState({ matches: [] });
});

describe('useScoreBoardStore', () => {
  it('startGame добавляет матч с начальными значениями', () => {
    const { startGame } = useScoreBoardStore.getState();
    startGame('Milan', 'Inter');

    const { matches } = useScoreBoardStore.getState();
    expect(matches).toHaveLength(1);
    expect(matches[0].home).toBe('Milan');
    expect(matches[0].away).toBe('Inter');
    expect(matches[0].homeScore).toBe(0);
    expect(matches[0].awayScore).toBe(0);
  });
});
