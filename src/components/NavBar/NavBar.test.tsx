import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import { stateMock, navItemMock } from './mocks';

let historyMock;

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('NavBar', () => {
  beforeEach(() => {
    historyMock = { push: jest.fn(), location: { pathname: '/' } };
    useSelector.mockImplementation((callback) => callback(stateMock));
  });

  afterEach(() => {
    cleanup();
    useSelector.mockClear();
  });

  it('should take a snapshot', () => {
    const { asFragment } = render(
      <NavBar
        history={historyMock}
        navBarItems={navItemMock}
        navBarTitle={`MyApp`}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should navIcons update the navigation history', () => {
    const { getByTestId } = render(
      <NavBar
        history={historyMock}
        navBarItems={navItemMock}
        navBarTitle={`MyApp`}
      />,
    );
    // This test only contemplates two levels of navItems
    navItemMock.forEach(({ childs, route }) => {
      if (!!childs && childs.length > 0) {
        childs.forEach((child) => {
          const idChild = child.route;
          fireEvent.click(getByTestId(idChild));
          expect(historyMock.push).toHaveBeenLastCalledWith(`/${idChild}`);
        });
      } else {
        fireEvent.click(getByTestId(route));
        expect(historyMock.push).toHaveBeenLastCalledWith(`/${route}`);
      }
    });
  });
});
