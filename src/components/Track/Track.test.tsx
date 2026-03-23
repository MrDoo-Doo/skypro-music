import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import Track from './Track';

const mocTracks: TrackType[] = data;
const mocTrack: TrackType = data[0];

describe('Track component', () => {
  test('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mocTrack} playlist={mocTracks} />
      </ReduxProvider>,
    );
    expect(screen.getAllByText(mocTrack.author).length).toBeGreaterThan(0);
  });
});
