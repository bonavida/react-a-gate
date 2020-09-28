import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
/** Mocks */
import ResizeObserverMock from '../../mocks/ResizeObserver';
/** Components and types */
import PopoverGate, { PopoverGateProps } from './PopoverGate';

afterEach(cleanup);

describe('PopoverGate', () => {
  let props: PopoverGateProps;

  beforeEach(() => {
    props = { content: 'popover text' };
    window.ResizeObserver = ResizeObserverMock;
  });

  it('should match snapshot', () => {
    // Arrange
    const { asFragment } = render(
      <PopoverGate {...props}>
        <span>test</span>
      </PopoverGate>
    );

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display trigger content', () => {
    // Arrange
    const { queryByText } = render(
      <PopoverGate {...props}>
        <span>test</span>
      </PopoverGate>
    );

    // Assert
    expect(queryByText('test')).toBeTruthy();
  });

  it('should not display popover content if trigger element is not being clicked (when mode = click)', () => {
    // Arrange
    const { queryByText } = render(
      <PopoverGate {...props}>
        <span>test</span>
      </PopoverGate>
    );

    // Assert
    expect(queryByText('popover')).toBeFalsy();
  });

  it('should display popover content if trigger element is being clicked (when mode = click)', () => {
    // Arrange
    const { getByText, getByTestId } = render(
      <PopoverGate {...props}>
        <span>test</span>
      </PopoverGate>
    );

    fireEvent.click(getByTestId('popover_trigger'));

    // Assert
    expect(getByText(/popover/i)).toBeTruthy();
  });

  it('should not display popover content if trigger element is not being hovered (when mode = hover)', () => {
    // Arrange
    const { queryByText } = render(
      <PopoverGate mode="hover" {...props}>
        <span>test</span>
      </PopoverGate>
    );

    // Assert
    expect(queryByText('popover')).toBeFalsy();
  });

  it('should display popover content if trigger element is being hovered (when mode = hover)', () => {
    // Arrange
    const { getByText, getByTestId } = render(
      <PopoverGate mode="hover" {...props}>
        <span>test</span>
      </PopoverGate>
    );

    fireEvent.mouseEnter(getByTestId('popover_trigger'));

    // Assert
    expect(getByText(/popover/i)).toBeTruthy();
  });

  it("should remain opened if it's clicked inside the popover content", () => {
    // Act
    const { getByText } = render(
      <PopoverGate {...props}>
        <span>test</span>
      </PopoverGate>
    );

    fireEvent.click(getByText(/test/i));

    // Assert
    expect(getByText(/popover/i)).toBeTruthy();
  });

  it("should be closed if it's clicked outside the popover content", () => {
    // Act
    const { queryByText } = render(
      <PopoverGate {...props}>
        <span>test</span>
      </PopoverGate>
    );

    fireEvent.click(document);

    // Assert
    expect(queryByText(/popover/i)).toBeFalsy();
  });
});
