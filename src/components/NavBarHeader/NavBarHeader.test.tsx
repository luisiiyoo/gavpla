import React from 'react';
import { cleanup, render } from '@testing-library/react';
import NavBarHeader from './NavBarHeader';

describe('NavBarHeader', () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(
      <NavBarHeader expanded={true} title={'Heee'} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a expanaded NavBarHeader with a providen title.', () => {
    const titleMock = 'TitleMock';
    const { getByTestId } = render(
      <NavBarHeader expanded={true} title={titleMock} />,
    );
    expect(getByTestId('headerTitle')).toHaveTextContent(titleMock);
    expect(getByTestId('headerContainer')).toHaveStyle(`display:block`);
  });

  it('should render but not displayed NavBarHeader', () => {
    const titleMock = 'TitleMock2';
    const { getByTestId } = render(
      <NavBarHeader expanded={false} title={titleMock} />,
    );
    expect(getByTestId('headerTitle')).toHaveTextContent(titleMock);
    expect(getByTestId('headerContainer')).toHaveStyle(`display:none`);
  });
});
