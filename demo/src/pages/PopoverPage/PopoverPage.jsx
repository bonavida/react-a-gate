import React, { useCallback, useState } from 'react';
import { PopoverGate } from 'react-a-gate';
/** Components */
import CodeBlock from 'components/CodeBlock';
import RadioGroup from 'components/RadioGroup';
import Checkbox from 'components/Checkbox';
/** Snippets */
import { popover_example_1, popover_example_2 } from 'snippets';
/** Styles */
import './PopoverPage.scss';

const defaultTriggerPositions = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
];

const defaultPopoverPositions = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
];

const defaultThemes = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
];

const defaultModes = [
  { label: 'Click', value: 'click' },
  { label: 'Hover', value: 'hover' },
];

const PopoverContent = () => (
  <div>
    I am a <span style={{ color: '#ffd500' }}>popover</span>. Every time you
    move me, I calculate my position automatically. So, if I should be displayed
    on the top but there's no space, I just move to the bottom. Same goes for
    the other positions. If you want to see it, just play around!
  </div>
);

const PopoverPage = () => {
  const [triggerPosition, setTriggerPosition] = useState('top');
  const [popoverPosition, setPopoverPosition] = useState('top');
  const [theme, setTheme] = useState('dark');
  const [mode, setMode] = useState('dark');
  const [isCustom, setIsCustom] = useState(false);

  const changeTriggerPosition = useCallback((position) => {
    setTriggerPosition(position);
  }, []);

  const changePopoverPosition = useCallback((position) => {
    setPopoverPosition(position);
  }, []);

  
  const changeUseCustom = useCallback((value) => {
    setIsCustom(value);
    
    if (!value) {
      setTheme('dark');
    }
  }, []);
  
  const changeTheme = useCallback((theme) => {
    setTheme(theme);
  }, []);
  
  const changeMode = useCallback((mode) => {
    setMode(mode);
  }, []);

  return (
    <div className="popoverPage__container">
      <div className="popoverPage__wrapper">
        <div className="popoverPage__config">
          <div className="popoverPage__block">
            <h5>Trigger position:</h5>
            <RadioGroup
              name="trigger_position"
              options={defaultTriggerPositions}
              initialValue="top"
              onChange={changeTriggerPosition}
            />
            <h5>Popover position:</h5>
            <RadioGroup
              name="popover_position"
              options={defaultPopoverPositions}
              initialValue="top"
              onChange={changePopoverPosition}
            />
          </div>
          <div className="popoverPage__block">
            {!isCustom && (
              <>
                <h5>Theme:</h5>
                <RadioGroup
                  name="popover_theme"
                  options={defaultThemes}
                  initialValue="dark"
                  onChange={changeTheme}
                />
              </>
            )}
            <Checkbox
              id="custom__popover"
              value="custom_popover"
              defaultChecked={isCustom}
              onChange={changeUseCustom}
            >
              Customize popover?
            </Checkbox>
            <h5 style={{ marginTop: '10px' }} >Mode:</h5>
            <RadioGroup
              name="popover_mode"
              options={defaultModes}
              initialValue="click"
              onChange={changeMode}
            />
          </div>
        </div>
        <CodeBlock value={popover_example_1}></CodeBlock>
        <CodeBlock language="sass" value={popover_example_2}></CodeBlock>
      </div>
      <div className={`popoverPage__button-wrapper popoverPage__button-wrapper--${triggerPosition}`}>
        <PopoverGate
          content={<PopoverContent />}
          place={popoverPosition}
          theme={theme}
          mode={mode}
          className={`custom-popover${isCustom ? ' blue' : ''}`}
        >
          <button
            type="button"
            className="popoverPage__button"
          >
            {mode === 'hover' ? 'Hover' : 'Click'} me
          </button>
        </PopoverGate>
      </div>
    </div>
  );
};

export default PopoverPage;
