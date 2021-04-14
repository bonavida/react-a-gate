import * as React from 'react';
import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
/** Hooks */
import usePortal from '../../hooks/usePortal';
import useResizeObserver from '../../hooks/useResizeObserver';
/** Utils */
import { calculatePosition } from '../../utils/utils';
/** Types */
import { PositionAttrs, Place, Theme } from '../../types/types';
/** Styles */
import './TooltipGate.scss';

export type TooltipGateProps = {
  rootId?: string;
  className?: string;
  content: string | JSX.Element;
  place?: Place;
  theme?: Theme;
  offset?: number;
};

const TooltipGate: React.FC<TooltipGateProps> = ({
  rootId = 'portal-root',
  className,
  content,
  place = 'top',
  theme = 'dark',
  offset = 10,
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ top: -99999, left: -99999 });
  const [arrowCoords, setArrowCords] = useState({ top: -99999, left: -99999 });
  const [placeTooltip, setPlaceTooltip] = useState(place);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<JSX.Element>(null);
  const target = usePortal(rootId);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const {
        top,
        left,
        arrowTop,
        arrowLeft,
        place: newPlace,
      }: PositionAttrs = calculatePosition({
        triggerRef,
        portalRef: tooltipRef,
        arrowRef,
        place,
        offset,
      });
      setCoords({ top, left });
      setArrowCords({ top: arrowTop, left: arrowLeft });
      setPlaceTooltip(newPlace);
    }
  }, [place, offset]);

  useResizeObserver(document.body, updatePosition);

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      updatePosition();
    }
  }, [showTooltip, updatePosition]);

  return (
    <>
      {React.cloneElement(children as JSX.Element, {
        onMouseEnter: () => {
          setShowTooltip(true);
        },
        onMouseLeave: () => {
          setShowTooltip(false);
        },
        'data-testid': 'tooltip_trigger',
        ref: triggerRef,
      })}
      {showTooltip &&
        createPortal(
          <div className={`${theme} ${className || ''}`}>
            <div
              ref={tooltipRef}
              className={`tooltip__container tooltip__container--${placeTooltip}`}
              style={{ ...coords }}
            >
              <div className="tooltip__inner">{content}</div>
            </div>
            <div
              ref={arrowRef}
              className={`tooltip__arrow tooltip__arrow--${placeTooltip}`}
              style={{ ...arrowCoords }}
            />
            <div
              className={`tooltip__arrow tooltip__arrow-border tooltip__arrow--${placeTooltip}`}
              style={{ ...arrowCoords }}
            />
          </div>,
          target
        )}
    </>
  );
};

export default TooltipGate;
