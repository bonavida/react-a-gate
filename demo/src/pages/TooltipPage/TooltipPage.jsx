import React, { useCallback, useState } from 'react';
import { TooltipGate } from 'react-a-gate';
/** Components */
import CodeBlock from 'components/CodeBlock';
import RadioGroup from 'components/RadioGroup';
import Checkbox from 'components/Checkbox';
/** Snippets */
import { tooltip_example_1 } from 'snippets';
/** Styles */
import './TooltipPage.scss';

const defaultTriggerPositions = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
];

const defaultTooltipPositions = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
];

const TooltipContent = () => (
  <div>
    I am a <span style={{ color: '#ffd500' }}>tooltip</span>. Every time you
    move me, I calculate my position automatically. So, if I should be displayed
    on the top but there's no space, I just move to the bottom. Same goes for
    the other positions. If you want to see it, just play around!
  </div>
);

const TooltipPage = () => {
  const [triggerPosition, setTriggerPosition] = useState('top');
  const [tooltipPosition, setTooltipPosition] = useState('top');
  const [isCustom, setIsCustom] = useState(false);

  const changeTriggerPosition = useCallback((position) => {
    setTriggerPosition(position);
  }, []);

  const changeTooltipPosition = useCallback((position) => {
    setTooltipPosition(position);
  }, []);

  const changeUseCustom = useCallback((value) => {
    setIsCustom(value);
  }, []);

  return (
    <div className="tooltipPage__container">
      <div className="tooltipPage__wrapper">
        <div className="tooltipPage__config">
          <div className="tooltipPage__block">
            <h5>Trigger position:</h5>
            <RadioGroup
              name="trigger_position"
              options={defaultTriggerPositions}
              initialValue="top"
              onChange={changeTriggerPosition}
            />
            <h5>Tooltip position:</h5>
            <RadioGroup
              name="tooltip_position"
              options={defaultTooltipPositions}
              initialValue="top"
              onChange={changeTooltipPosition}
            />
          </div>
          <div className="tooltipPage__block">
            <Checkbox
              id="custom__tooltip"
              value="custom_tooltip"
              defaultChecked={isCustom}
              onChange={changeUseCustom}
            >
              Customize tooltip?
            </Checkbox>
          </div>
        </div>
        <CodeBlock value={tooltip_example_1}></CodeBlock>
      </div>
      <TooltipGate
        content={<TooltipContent />}
        place={tooltipPosition}
        className={`custom-tooltip${isCustom ? ' blue' : ''}`}
      >
        <button
          type="button"
          className={`tooltipPage__button tooltipPage__button--${triggerPosition}`}
        >
          Hover me
        </button>
      </TooltipGate>
    </div>
  );
};

export default TooltipPage;
