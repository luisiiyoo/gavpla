import reducer, { initialState } from './MainComponent';

describe('MainComponent Reducer', () => {
  it('should set default state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should update the route with the string provided', () => {
    const actionMock = {
      type: 'SET_SELECTED_ROUTE',
      route: '/other-route',
    };
    expect(reducer(initialState, actionMock)).toEqual({
      ...initialState,
      route: '/other-route',
    });
  });

  it('should change the expand flag with the boolean provided', () => {
    const actionMock = {
      type: 'SET_EXPAND_NAVBAR',
      expand: !initialState.expand,
    };
    expect(reducer(initialState, actionMock)).toEqual({
      ...initialState,
      expand: !initialState.expand,
    });
  });
});
