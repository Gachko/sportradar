import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BoardItem } from '../pages/ScoreBoard/components/Board/BoardItem';

it('calls onFinish with its id when Finish clicked', async () => {
  const user = userEvent.setup();
  const onFinish = jest.fn();

  render(
    <ul>
      <BoardItem
        id={123}
        home="Milan"
        away="Real"
        homeScore={0}
        awayScore={0}
        onFinish={onFinish}
      />
    </ul>,
  );

  await user.click(screen.getByRole('button', { name: /finish/i }));
  expect(onFinish).toHaveBeenCalledWith(123);
});
