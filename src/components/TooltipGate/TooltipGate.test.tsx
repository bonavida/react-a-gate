import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
/** Mocks */
import ResizeObserverMock from '../../mocks/ResizeObserver';
/** Components and types */
import TooltipGate, { TooltipGateProps } from './TooltipGate';

afterEach(cleanup);

describe('TooltipGate', () => {
  let props: TooltipGateProps;

  beforeEach(() => {
    props = { content: 'tooltip text' };
    window.ResizeObserver = ResizeObserverMock;
  });

  it('should match snapshot', () => {
    // Arrange
    const { asFragment } = render(
      <TooltipGate {...props}>
        <span>test</span>
      </TooltipGate>
    );

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display trigger content', () => {
    // Arrange
    const { queryByText } = render(
      <TooltipGate {...props}>
        <span>test</span>
      </TooltipGate>
    );

    // Assert
    expect(queryByText('test')).toBeTruthy();
  });

  it('should not display tooltip content if trigger element is not being hovered', () => {
    // Arrange
    const { queryByText } = render(
      <TooltipGate {...props}>
        <span>test</span>
      </TooltipGate>
    );

    // Assert
    expect(queryByText('tooltip')).toBeFalsy();
  });

  it('should display tooltip content if trigger element is being hovered', () => {
    // Arrange
    const { getByText, getByTestId } = render(
      <TooltipGate {...props}>
        <span>test</span>
      </TooltipGate>
    );

    fireEvent.mouseEnter(getByTestId('tooltip_trigger'));

    // Assert
    expect(getByText(/tooltip/i)).toBeTruthy();
  });
});
