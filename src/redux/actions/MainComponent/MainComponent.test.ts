import { setSelectedRoute, setExpandNavBar } from './MainComponent';

describe('MainComponent Actions', () => {
  it('should setup setSelectedRoute action object', () => {
    const routeMock = '/my-home';
    const action = setSelectedRoute(routeMock);

    expect(action).toEqual({
      type: 'SET_SELECTED_ROUTE',
      route: routeMock,
    });
  });

  it('should setup setExpandNavBar action object', () => {
    const expandMock = true;
    const action = setExpandNavBar(expandMock);

    expect(action).toEqual({
      type: 'SET_EXPAND_NAVBAR',
      expand: expandMock,
    });
  });
});
