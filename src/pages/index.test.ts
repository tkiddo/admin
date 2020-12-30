/*
 * @Author: tkiddo
 * @Date: 2020-12-30 13:20:41
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-30 15:27:23
 * @Description:
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from './index';

test('renders Index Component', () => {
  render(Index());
  expect(screen.getByText('Page index')).toBeInTheDocument();
});
