import React from 'react';
import { screen } from '@testing-library/react';
import { NotFoundView } from '../NotFoundView';
import { render, wrapStore } from '../../../utils/testUtilities';
import { MOCK_TEST_DATA } from '../../../utils/mockTestData';

const LOCAL_STATE = MOCK_TEST_DATA;
test('renders not found', () => {
  render(wrapStore(<NotFoundView />, LOCAL_STATE));
  const linkElement = screen.getByText(/Page not found/i);
  expect(linkElement).toBeInTheDocument();
});
