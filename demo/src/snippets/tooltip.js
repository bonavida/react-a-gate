export const tooltip_example_1 = `
import React, { useState } from 'react';
import { TooltipGate } from 'react-a-gate';
/** Styles */
import './App.scss';

const TooltipContent = () => (
  <div>
    I am a <span style={{ color: '#ffd500' }}>tooltip</span>. Every time you
    move me, I calculate my position automatically. So, if I should be displayed
    on the top but there's no space, I just move to the bottom. Same goes for
    the other positions. If you want to see it, just play around!
  </div>
);

const App = () => (
  <!-- Tooltip wrapper -->
  <TooltipGate
    content={<TooltipContent />}
    place="top"
    className="custom-tooltip"
  >
    <!-- Trigger element -->
    <button type="button" className='tooltipPage__button'>
      Hover me
    </button>
  </TooltipGate>
);
`;

export const tooltip_example_2 = `
// Custom CSS class that overrides the default styles
.custom-tooltip {
  .tooltip__inner {
    padding: 10px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.3em;
  }
}

// Other custom CSS class to override the default colors.
// The main classes are:
// - tooltip__inner: The content of the tooltip
// - tooltip__arrow, tooltip__arrow-border: The tooltip arrow
.blue {
  .tooltip__inner {
    background-color: #1799bd;
    border: 1px solid #afebff;
  }

  .tooltip__arrow {
    border-color: #1799bd;
  }

  .tooltip__arrow-border {
    border-color: #afebff;
  }
}
`;
