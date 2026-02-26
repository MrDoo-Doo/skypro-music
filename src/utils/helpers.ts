import { TrackType } from '@/sharedTypes/sharedTypes';

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();
  arr.forEach((item) => {
    const value = item[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });
  return Array.from(uniqueValues);
}

export function formatTime(time: number) {
  const minuts = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const secondsFormat = seconds < 10 ? `0${seconds}` : seconds;
  return `${minuts}:${secondsFormat}`;
}
