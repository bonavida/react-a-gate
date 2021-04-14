export type Place = 'top' | 'bottom' | 'left' | 'right';
export type Mode = 'click' | 'hover';
export type Theme = 'light' | 'dark';

export interface PositionParams {
  triggerRef: React.MutableRefObject<Element | JSX.Element | null>;
  portalRef: React.MutableRefObject<HTMLDivElement | null>;
  arrowRef: React.MutableRefObject<HTMLDivElement | null>;
  place: Place;
  offset: number;
}

export interface PositionAttrs {
  top: number;
  left: number;
  arrowTop: number;
  arrowLeft: number;
  place: Place;
}
