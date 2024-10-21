import { format } from 'date-fns/format';
import { profileConfigs } from '../profile-configs.ts';

export function compare(a: number, b: number) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export function randomId() {
  return Math.random().toString().substring(2);
}

export function toIsoDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toISOString();
}

export function wordsInitials(words: string, length: number) {
  return words
    ? words
        .split(' ')
        .map((str) => str[0])
        .slice(0, length)
        .join('')
    : null;
}

export function formatDate(date: string | Date, targetFormat?: string) {
  return format(
    date instanceof Date ? date : new Date(date),
    targetFormat || profileConfigs.defaultDateFormat,
  );
}

export const keycodes = {
  BACKSPACE: 8,
  ArrowUp: 38,
  ArrowDown: 40,
  ENTER: 13,
  ESC: 27,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
};

export function toBoolean(value: unknown): boolean {
  return value ? true : value === '';
}
