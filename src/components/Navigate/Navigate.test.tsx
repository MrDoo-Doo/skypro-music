import '@testing-library/jest-dom';
import ReduxProvider from '@/store/ReduxProvider';
import { render, screen } from '@testing-library/react';
import Navigate from './Navigate';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Navigate', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Отрисовка компонента кнопки меню', () => {
    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>,
    );

    const navMenu = container.querySelector('div.nav__burger');
    expect(navMenu).toBeInTheDocument();
    expect(navMenu).toBeVisible();
  });

  test('На странице не отображаютя пункты меню', () => {
    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>,
    );

    const listMenu = container.querySelector('div.nav__menu');
    expect(listMenu).not.toHaveClass('active_menu');
  });

  test('После нажатия кнопки отображаютя пункты меню', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>,
    );

    const navButton = container.querySelector('div.nav__burger');

    if (navButton) {
      await user.click(navButton);

      const navMenu = container.querySelector('div.nav__menu');
      expect(navMenu).toBeInTheDocument();
      expect(navMenu).toBeVisible();

      expect(screen.getByText('Главное')).toBeInTheDocument();
      expect(screen.getByText('Мой плейлист')).toBeInTheDocument();
      expect(screen.getByText('Войти')).toBeInTheDocument();
    } else {
      throw new Error('Кнопка меню не найдена');
    }
  });

  test('Если меню открыто, при нажатии на конопку меню, оно закрывается', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ReduxProvider>
        <Navigate />
      </ReduxProvider>,
    );

    const navButton = container.querySelector('div.nav__burger');

    if (navButton) {
      // открывается
      await user.click(navButton);
      // закрывается
      await user.click(navButton);

      const listMenu = container.querySelector('div.nav__menu');
      expect(listMenu).not.toHaveClass('active_menu');
    } else {
      throw new Error('Кнопка меню не найдена');
    }
  });
});
