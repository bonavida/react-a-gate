import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
/** Components and types */
import ModalGate, { ModalGateProps } from './ModalGate';

afterEach(cleanup);

describe('ModalGate', () => {
  let onClose: () => void;
  let props: ModalGateProps;

  beforeEach(() => {
    onClose = jest.fn();
    props = { id: 'test_modal', isOpen: true, onClose };
  });

  it('should match snapshot', () => {
    // Arrange
    const { asFragment } = render(<ModalGate {...props}>test</ModalGate>);

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the children if it's closed", () => {
    // Arrange
    const { queryByText } = render(
      <ModalGate {...props} isOpen={false}>
        <div>
          <span>test</span>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
      </ModalGate>
    );

    // Assert
    expect(queryByText('test')).toBeFalsy();
  });

  it("should display the children if it's opened", () => {
    // Arrange
    const { getByText } = render(
      <ModalGate {...props}>
        <div>
          <span>test</span>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
      </ModalGate>
    );

    // Assert
    expect(getByText('test')).toBeTruthy();
  });

  it('should be closed if onClose is triggered from inside the children', () => {
    // Arrange
    const { getByText } = render(
      <ModalGate {...props}>
        <div>
          <span>test</span>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
      </ModalGate>
    );

    // Act
    fireEvent.click(getByText(/close/i));

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should be closed if key ESC is pressed', () => {
    // Act
    const { getByText } = render(
      <ModalGate {...props}>
        <div>
          <span>test</span>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
      </ModalGate>
    );

    fireEvent.keyDown(getByText(/test/i), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should be closed if it's clicked outside the modal", () => {
    // Act
    const { getByTestId } = render(
      <ModalGate {...props} closeWhenClickOutside>
        <div>
          <span>test</span>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
      </ModalGate>
    );

    fireEvent.click(getByTestId('modal_backdrop'));

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should remain opened if it's clicked inside the modal", () => {
    // Act
    const { getByText } = render(
      <ModalGate {...props} closeWhenClickOutside>
        <div>
          <span>test</span>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
      </ModalGate>
    );

    fireEvent.click(getByText(/test/i));

    // Assert
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it('should lock the background scroll when opened', () => {
    // Act
    render(
      <ModalGate {...props}>
        <div>
          <span>test</span>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>
      </ModalGate>
    );

    // Assert
    expect(document.body).toHaveStyle('overflow: hidden');
  });
});
