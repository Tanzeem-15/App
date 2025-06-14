/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import ReactTestRenderer from 'react-test-renderer';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  jest.useFakeTimers();
  ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
  jest.runAllTimers();
  jest.useRealTimers();
});
