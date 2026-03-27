import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import FilterItem from './FilterItem';
import { getUniqueValuesByKey } from '../../utils/helpers';

const mockTracks: TrackType[] = data;
const mockFilter: keyof TrackType = 'author';

describe('FilterItem component', () => {
  const mockFun = jest.fn();
  test('Отображение списка в фильтах', () => {
    render(
      <ReduxProvider>
        <FilterItem
          filter={mockFilter}
          display={mockFilter}
          tracks={mockTracks}
          onSelect={mockFun}
        />
      </ReduxProvider>,
    );
    const funSetValue = getUniqueValuesByKey(mockTracks, mockFilter);
    expect(funSetValue.length).toBeGreaterThan(0);
    funSetValue.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
