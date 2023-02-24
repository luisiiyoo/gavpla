import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { stateMock, navBarItemsMock } from './mocks';
import Routes from './Router';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('JourneyRouter', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(stateMock));
  });

  afterEach(() => {
    cleanup();
    useSelector.mockClear();
  });

  it('should take a snapshot', () => {
    const navBarItemsMock = [
      {
        route: 'home',
        title: 'Home',
        iconClass: 'fa fa-fw fa-home',
      },
    ];
    const { asFragment } = render(<Routes navBarItems={navBarItemsMock} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the root page', () => {
    const { getByTestId } = render(<Routes navBarItems={navBarItemsMock} />);
    expect(getByTestId('mainComponent').innerHTML).toMatch('Cards Game');
  });

  it('should render the home page', async () => {
    const { getByTestId } = render(<Routes navBarItems={navBarItemsMock} />);
    fireEvent.click(getByTestId('home'));
    expect(getByTestId('mainComponent')).toHaveTextContent(`Cards Game`);
  });

  it('should render 404 Not Found message when an invalid route or not provided component is reached', () => {
    const { getByTestId } = render(
      <Routes
        navBarItems={[
          {
            route: 'route-mock',
            title: 'Route mock without a component defined',
          },
        ]}
      />,
    );
    fireEvent.click(getByTestId('route-mock'));
    expect(getByTestId('ErrorMessage').innerHTML).toMatch('Page not found');
  });
});
