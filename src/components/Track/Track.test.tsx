import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import Track from './Track';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('Track component', () => {
  test('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
  });
});
