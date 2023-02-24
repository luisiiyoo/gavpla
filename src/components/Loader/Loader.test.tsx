import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader', () => {
  afterEach(cleanup);

  it('should render Loading component with Loading message', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
