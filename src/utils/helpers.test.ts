import { data } from '@/data';
import { formatTime, getTimePanel, getUniqueValuesByKey } from './helpers';

describe('Helpers', () => {
  describe('getUniqueValuesByKey', () => {
    it('Добавление нуля, если секунд меньше 10', () => {
      expect(getUniqueValuesByKey(data, 'author')).toHaveLength(7);
    });
  });

  describe('formatTime', () => {
    it('Добавление нуля, если секунд меньше 10', () => {
      expect(formatTime(61)).toBe('1:01');
    });
  });

  describe('getTimePanel', () => {
    it('Отображение прогресса времени', () => {
      expect(getTimePanel(61, 90)).toBe('1:01 / 1:30');
    });
  });
});
