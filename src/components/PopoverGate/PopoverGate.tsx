import * as React from 'react';
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
/** Hooks */
import usePortal from 'hooks/usePortal';
import useResizeObserver from 'hooks/useResizeObserver';
/** Utils */
import { calculatePosition } from 'utils';
/** Types */
import { Place, Mode, Theme } from 'types';
/** Styles */
import './PopoverGate.scss';

export type PopoverGateProps = {
  rootId?: string;
  className?: string;
  content: string | JSX.Element;
  place?: Place;
  mode?: Mode;
  closeWhenClickOutside?: boolean;
  theme?: Theme;
  offset?: number;
};

const PopoverGate: React.FC<PopoverGateProps> = ({
  rootId = 'portal-root',
  className,
  content,
  place = 'top',
  mode = 'click',
  closeWhenClickOutside = true,
  theme,
  offset = 10,
  children,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [coords, setCoords] = useState({ top: -99999, left: -99999 });
  const [arrowCoords, setArrowCords] = useState({ top: -99999, left: -99999 });
  const [placePopover, setPlacePopover] = useState(place);
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<JSX.Element>(null);
  const target = usePortal(rootId);

  const handleCloseWhenClickOutside = useCallback(
    (e) => {
      if (
        closeWhenClickOutside &&
        triggerRef.current !== e.target &&
        !popoverRef.current?.contains(e.target)
      ) {
        setShowPopover(false);
      }
    },
    [closeWhenClickOutside]
  );

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const {
        top,
        left,
        arrowTop,
        arrowLeft,
        place: newPlace,
      } = calculatePosition(triggerRef, popoverRef, arrowRef, place, offset);
      setCoords({ top, left });
      setArrowCords({ top: arrowTop, left: arrowLeft });
      setPlacePopover(newPlace);
    }
  }, [place, offset]);

  useResizeObserver(document.body, updatePosition);

  useLayoutEffect(() => {
    if (popoverRef.current) {
      updatePosition();
    }
  }, [showPopover, updatePosition]);

  useEffect(() => {
    if (mode === 'click') {
      window.addEventListener('click', handleCloseWhenClickOutside);
    }

    return () => {
      if (mode === 'click') {
        window.removeEventListener('click', handleCloseWhenClickOutside);
      }
    };
  }, [mode, handleCloseWhenClickOutside]);

  const popoverEvents = useCallback(() => {
    switch (mode) {
      case 'click':
      default:
        return {
          onClick: () => {
            setShowPopover((showPopoverState) => !showPopoverState);
          },
        };
      case 'hover':
        return {
          onMouseEnter: () => {
            setShowPopover(true);
          },
          onMouseLeave: () => {
            setShowPopover(false);
          },
        };
    }
  }, [mode]);

  return (
    <>
      {React.cloneElement(children as JSX.Element, {
        ...popoverEvents(),
        'data-testid': 'popover_trigger',
        ref: triggerRef,
      })}
      {showPopover &&
        createPortal(
          <div className={className || theme || 'popover'}>
            <div
              ref={popoverRef}
              className={`popover__container popover__container--${placePopover}`}
              style={{ ...coords }}
              role="tooltip"
            >
              <div className="popover__inner">{content}</div>
            </div>
            <div
              ref={arrowRef}
              className={`popover__arrow popover__arrow--${placePopover}`}
              style={{ ...arrowCoords }}
            />
            <div
              className={`tooltip__arrow tooltip__arrow-border tooltip__arrow--${placePopover}`}
              style={{ ...arrowCoords }}
            />
          </div>,
          target
        )}
    </>
  );
};

export default PopoverGate;
