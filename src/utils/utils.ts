import { Place } from 'types';

export const calculatePosition = (
  triggerRef: React.MutableRefObject<HTMLSpanElement | JSX.Element | null>,
  portalRef: React.MutableRefObject<HTMLDivElement | null>,
  arrowRef: React.MutableRefObject<HTMLDivElement | null>,
  place: Place,
  offset: number
) => {
  let top = 0;
  let left = 0;
  let arrowTop = 0;
  let arrowLeft = 0;
  let newPlace = place;

  if (
    !portalRef ||
    !portalRef.current ||
    !triggerRef ||
    !triggerRef.current ||
    !arrowRef ||
    !arrowRef.current
  ) {
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

  const bRight = rx + ttRect.width <= window.scrollX + docWidth;
  const bLeft = lx - ttRect.width >= 0;
  const bAbove = ty - ttRect.height >= 0;
  const bBelow = by + ttRect.height <= window.scrollY + docHeight;

  switch (place) {
    case 'top':
      if (bAbove) {
        top = ty - ttRect.height - offset;
        arrowTop = top + ttRect.height;
      } else {
        top = by + offset;
        arrowTop = top - arrRect.height;
        newPlace = 'bottom';
      }
      // Initial left position for tooltip
      left = lx + (trRect.width - ttRect.width) / 2;
      arrowLeft = lx + (trRect.width - arrRect.width) / 2;

      // Check if it will render outside the window and recalculate
      if (left + ttRect.width > docWidth) {
        left = rx - ttRect.width;
      } else if (left < 0) {
        left = lx;
      }

      break;

    case 'bottom':
      if (bBelow) {
        top = by + offset;
        arrowTop = top - arrRect.height;
      } else {
        top = ty - ttRect.height - offset;
        arrowTop = top + ttRect.height;
        newPlace = 'top';
      }
      // Initial left position for tooltip
      left = lx + (trRect.width - ttRect.width) / 2;
      arrowLeft = lx + (trRect.width - arrRect.width) / 2;

      // Check if it will render outside the window and recalculate
      if (left + ttRect.width > docWidth) {
        left = rx - ttRect.width;
      } else if (left < 0) {
        left = lx;
      }

      break;

    case 'left':
      if (bLeft) {
        left = lx - ttRect.width - offset;
        arrowLeft = left + ttRect.width;
      } else {
        left = rx + offset;
        arrowLeft = left - arrRect.width;
        newPlace = 'right';
      }
      // Initial top position for tooltip
      top = ty + (trRect.height - ttRect.height) / 2;
      arrowTop = ty + (trRect.height - arrRect.height) / 2;

      // Check if it will render outside the window and recalculate
      if (top + ttRect.height > docHeight) {
        top = by - ttRect.height;
      } else if (top < 0) {
        top = ty;
      }

      break;

    case 'right':
      if (bRight) {
        left = rx + offset;
        arrowLeft = left - arrRect.width;
      } else {
        left = lx - ttRect.width - offset;
        arrowLeft = left + ttRect.width;
        newPlace = 'left';
      }
      // Initial top position for tooltip
      top = ty + (trRect.height - ttRect.height) / 2;
      arrowTop = ty + (trRect.height - arrRect.height) / 2;

      // Check if it will render outside the window and recalculate
      if (top + ttRect.height > docHeight) {
        top = by - ttRect.height;
      } else if (top < 0) {
        top = ty;
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
