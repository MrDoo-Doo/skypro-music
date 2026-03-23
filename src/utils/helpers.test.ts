import { formatTime } from './helpers';
describe('formatTime', () => {
  it('Добавление нуля, если секунд меньше 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
});
