export const popover_example_1 = `
import React, { useState } from 'react';
import { PopoverGate } from 'react-a-gate';
/** Styles */
import './App.scss';

const PopoverContent = () => (
  <div>
    I am a <span style={{ color: '#ffd500' }}>popover</span>. Every time you
    move me, I calculate my position automatically. So, if I should be displayed
    on the top but there's no space, I just move to the bottom. Same goes for
    the other positions. If you want to see it, just play around!
  </div>
);

const App = () => (
  <!-- Popover wrapper -->
  <PopoverGate
    content={<PopoverContent />}
    place="top"
    mode="click"
    className="custom-popover"
  >
    <!-- Trigger element -->
    <button type="button" className='popoverPage__button'>
      Hover me
    </button>
  </PopoverGate>
);
`;

export const popover_example_2 = `
// Custom CSS class that overrides the default styles
.custom-popover {
  .popover__inner {
    padding: 10px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.3em;
  }
}

// Other custom CSS class to override the default colors.
// The main classes are:
// - popover__inner: The content of the popover
// - popover__arrow, popover__arrow-border: The popover arrow
.custom-popover.blue {
  .popover__inner {
    background-color: #1799bd;
    border: 1px solid #afebff;
  }

  .popover__arrow {
    border-color: #1799bd;
  }

  .popover__arrow-border {
    border-color: #afebff;
  }
}
`;
