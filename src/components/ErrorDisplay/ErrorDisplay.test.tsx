import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ErrorDisplay from '../ErrorDisplay';

describe('ErrorDisplay', () => {
  afterEach(cleanup);

  it('should render Error component with a given message', () => {
    const messageMock = 'My Error';
    const { asFragment, getByTestId } = render(
      <ErrorDisplay message={messageMock} />,
    );
    expect(getByTestId('ErrorLabel')).toHaveTextContent('Error');
    expect(getByTestId('ErrorMessage')).toHaveTextContent(`${messageMock}`);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Error component with a given message and status code', () => {
    const messageMock = 'My Error';
    const statusCodeMock = 599;
    const { asFragment, getByTestId } = render(
      <ErrorDisplay message={messageMock} statusCode={statusCodeMock} />,
    );
    expect(getByTestId('ErrorLabel')).toHaveTextContent(
      `Error ${statusCodeMock}`,
    );
    expect(getByTestId('ErrorMessage')).toHaveTextContent(`${messageMock}`);
    expect(asFragment()).toMatchSnapshot();
  });
});
