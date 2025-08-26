import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartGameDialog } from '../pages/ScoreBoard/components/StartGameDialog/StartGameDialog';
import { useScoreBoardStore } from '../store/useScoreBoardStore';

beforeEach(() => {
  useScoreBoardStore.setState({ matches: [] });
});

describe('StartGameDialog', () => {
  it('should render fields and buttons, when open=true', () => {
    render(<StartGameDialog open={true} onClose={jest.fn()} />);
    expect(screen.getByText(/Start a New Game/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Home Team/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Away Team/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });

  it('should show errors whe fields are empty and should not add match', async () => {
    const user = userEvent.setup();
    render(<StartGameDialog open={true} onClose={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /Start/i }));

    expect(screen.getByText(/Home team is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Away team is required/i)).toBeInTheDocument();

    const { matches } = useScoreBoardStore.getState();
    expect(matches).toHaveLength(0);
  });

  it('should add 0-0 match and close dialog', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(<StartGameDialog open={true} onClose={onClose} />);

    await user.type(screen.getByLabelText(/Home Team/i), 'Real');
    await user.type(screen.getByLabelText(/Away Team/i), 'Madrid');

    await user.click(screen.getByRole('button', { name: /Start/i }));

    const { matches } = useScoreBoardStore.getState();
    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({
      home: 'Real',
      away: 'Madrid',
      homeScore: 0,
      awayScore: 0,
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('error disappears on input after a failed submit', async () => {
    const user = userEvent.setup();

    render(<StartGameDialog open={true} onClose={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /Start/i }));
    expect(screen.getByText(/Home team is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Away team is required/i)).toBeInTheDocument();

    const homeInput = screen.getByLabelText(/Home Team/i);
    await user.type(homeInput, 'Real Madrid');

    expect(screen.queryByText(/Home team is required/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Away team is required/i)).toBeInTheDocument();
  });
});
