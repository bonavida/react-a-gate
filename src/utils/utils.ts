import { PositionAttrs, PositionParams } from '../types/types';

export const calculatePosition = ({
  triggerRef,
  portalRef,
  arrowRef,
  place,
  offset,
}: PositionParams): PositionAttrs => {
  let top = 0;
  let left = 0;
  let arrowTop = 0;
  let arrowLeft = 0;
  let newPlace = place;

  if (!portalRef?.current || !triggerRef?.current || !arrowRef?.current) {
    return {
      top,
      left,
      arrowTop,
      arrowLeft,
      place: newPlace,
    };
  }

  const docWidth = document.documentElement.clientWidth;
  const docHeight = document.documentElement.clientHeight;
  const trRect = (triggerRef.current as Element).getBoundingClientRect();
  const ttRect = portalRef.current.getBoundingClientRect();
  const arrRect = arrowRef.current.getBoundingClientRect();

  const rx = trRect.x + trRect.width; // most right x
  const lx = trRect.x; // most left x
  const ty = trRect.y; // most top y
  const by = trRect.y + trRect.height; // most bottom y

  const { scrollX, scrollY } = window;

  if (
    Number.isNaN(rx) ||
    Number.isNaN(lx) ||
    Number.isNaN(ty) ||
    Number.isNaN(by)
  ) {
    return {
      top,
      left,
      arrowTop,
      arrowLeft,
      place: newPlace,
    };
  }

  const bRight = rx + ttRect.width + offset + scrollX <= scrollX + docWidth;
  const bLeft = lx - ttRect.width >= 0;
  const bAbove = ty - ttRect.height >= 0;
  const bBelow = by + ttRect.height + offset + scrollY <= scrollY + docHeight;

  switch (place) {
    case 'top':
      if (bAbove) {
        top = ty - ttRect.height - offset + scrollY;
        arrowTop = top + ttRect.height;
      } else {
        top = by + offset + scrollY;
        arrowTop = top - arrRect.height;
        newPlace = 'bottom';
      }
      // Initial left position for tooltip
      left = lx + scrollX + (trRect.width - ttRect.width) / 2;
      arrowLeft = lx + scrollX + (trRect.width - arrRect.width) / 2;

      // Check if it will render outside the window and recalculate
      if (left + ttRect.width > docWidth + scrollX) {
        left = rx - ttRect.width + scrollX;
      } else if (left < 0) {
        left = lx + scrollX;
      }

      break;

    case 'bottom':
      if (bBelow) {
        top = by + offset + scrollY;
        arrowTop = top - arrRect.height;
      } else {
        top = ty - ttRect.height - offset + scrollY;
        arrowTop = top + ttRect.height;
        newPlace = 'top';
      }
      // Initial left position for tooltip
      left = lx + scrollX + (trRect.width - ttRect.width) / 2;
      arrowLeft = lx + scrollX + (trRect.width - arrRect.width) / 2;

      // Check if it will render outside the window and recalculate
      if (left + ttRect.width > docWidth + scrollX) {
        left = rx - ttRect.width + scrollX;
      } else if (left < 0) {
        left = lx + scrollX;
      }

      break;

    case 'left':
      if (bLeft) {
        left = lx - ttRect.width - offset + scrollX;
        arrowLeft = left + ttRect.width;
      } else {
        left = rx + offset + scrollX;
        arrowLeft = left - arrRect.width;
        newPlace = 'right';
      }
      // Initial top position for tooltip
      top = ty + scrollY + (trRect.height - ttRect.height) / 2;
      arrowTop = ty + scrollY + (trRect.height - arrRect.height) / 2;

      // Check if it will render outside the window and recalculate
      if (top + ttRect.height > docHeight + scrollY) {
        top = by - ttRect.height + scrollY;
      } else if (top < 0) {
        top = ty + scrollY;
      }

      break;

    case 'right':
      if (bRight) {
        left = rx + offset + scrollX;
        arrowLeft = left - arrRect.width;
      } else {
        left = lx - ttRect.width - offset + scrollX;
        arrowLeft = left + ttRect.width;
        newPlace = 'left';
      }
      // Initial top position for tooltip
      top = ty + scrollY + (trRect.height - ttRect.height) / 2;
      arrowTop = ty + scrollY + (trRect.height - arrRect.height) / 2;

      // Check if it will render outside the window and recalculate
      if (top + ttRect.height > docHeight + scrollY) {
        top = by - ttRect.height + scrollY;
      } else if (top < 0) {
        top = ty + scrollY;
      }

      break;

    default:
      break;
  }

  return {
    top,
    left,
    arrowTop,
    arrowLeft,
    place: newPlace,
  };
};
